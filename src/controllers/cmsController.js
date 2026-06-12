const cmsService = require('../services/cmsService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const ProcessStep = require('../models/ProcessStep');
const WhyFeature = require('../models/WhyFeature');
const Testimonial = require('../models/Testimonial');
const Client = require('../models/Client');
const Lead = require('../models/Lead');
const cloudinary = require('../config/cloudinary');
const emailService = require('../services/emailService');

// ── Home CMS ────────────────────────────────────────────────────────────────
exports.getHome = catchAsync(async (req, res) => {
  const data = await cmsService.getHome();
  res.json({ success: true, data });
});

exports.updateHome = catchAsync(async (req, res) => {
  const data = await cmsService.updateHome(req.body, req.admin?._id);
  res.json({ success: true, data });
});

exports.getProcessSteps = catchAsync(async (req, res) => {
  const data = await cmsService.getProcessSteps();
  res.json({ success: true, data });
});

exports.getWhyFeatures = catchAsync(async (req, res) => {
  const data = await cmsService.getWhyFeatures();
  res.json({ success: true, data });
});

// ── Settings ────────────────────────────────────────────────────────────────
exports.getSettings = catchAsync(async (req, res) => {
  const data = await cmsService.getSettings();
  res.json({ success: true, data });
});

exports.updateSettings = catchAsync(async (req, res) => {
  const data = await cmsService.updateSettings(req.body, req.admin?._id);
  res.json({ success: true, data });
});

// ── Process Steps ───────────────────────────────────────────────────────────
exports.getAllProcessSteps = catchAsync(async (req, res) => {
  const data = await ProcessStep.find().sort({ displayOrder: 1, number: 1 });
  res.json({ success: true, data });
});

exports.createProcessStep = catchAsync(async (req, res) => {
  const data = await ProcessStep.create(req.body);
  res.status(201).json({ success: true, data });
});

exports.updateProcessStep = catchAsync(async (req, res) => {
  const data = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!data) throw new AppError('Process step not found', 404);
  res.json({ success: true, data });
});

exports.deleteProcessStep = catchAsync(async (req, res) => {
  const data = await ProcessStep.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!data) throw new AppError('Process step not found', 404);
  res.json({ success: true, message: 'Deleted successfully' });
});

// ── Why Features ────────────────────────────────────────────────────────────
exports.getAllWhyFeatures = catchAsync(async (req, res) => {
  const data = await WhyFeature.find().sort({ displayOrder: 1 });
  res.json({ success: true, data });
});

exports.createWhyFeature = catchAsync(async (req, res) => {
  const data = await WhyFeature.create(req.body);
  res.status(201).json({ success: true, data });
});

exports.updateWhyFeature = catchAsync(async (req, res) => {
  const data = await WhyFeature.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!data) throw new AppError('Feature not found', 404);
  res.json({ success: true, data });
});

exports.deleteWhyFeature = catchAsync(async (req, res) => {
  const data = await WhyFeature.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!data) throw new AppError('Feature not found', 404);
  res.json({ success: true, message: 'Deleted successfully' });
});

// ── Testimonials ────────────────────────────────────────────────────────────
exports.getAllTestimonials = catchAsync(async (req, res) => {
  const items = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });
  res.json({ success: true, data: items });
});

exports.createTestimonial = catchAsync(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.updateTestimonial = catchAsync(async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new AppError('Testimonial not found', 404);
  res.json({ success: true, data: item });
});

exports.deleteTestimonial = catchAsync(async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) throw new AppError('Testimonial not found', 404);
  
  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId).catch(() => {});
  }
  await Testimonial.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ success: true, message: 'Deleted successfully' });
});

// ── Clients / Partners ──────────────────────────────────────────────────────
exports.getAllClients = catchAsync(async (req, res) => {
  const items = await Client.find().sort({ displayOrder: 1, createdAt: -1 });
  res.json({ success: true, data: items });
});

exports.createClient = catchAsync(async (req, res) => {
  const item = await Client.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.updateClient = catchAsync(async (req, res) => {
  const item = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new AppError('Client not found', 404);
  res.json({ success: true, data: item });
});

exports.deleteClient = catchAsync(async (req, res) => {
  const item = await Client.findById(req.params.id);
  if (!item) throw new AppError('Client not found', 404);
  
  if (item.logoPublicId) {
    await cloudinary.uploader.destroy(item.logoPublicId).catch(() => {});
  }
  await Client.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ success: true, message: 'Deleted successfully' });
});

// ── Leads ───────────────────────────────────────────────────────────────────
exports.getAllLeads = catchAsync(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const items = await Lead.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: items });
});

exports.getLeadsByStatus = catchAsync(async (req, res) => {
  const items = await Lead.find().sort({ createdAt: -1 });
  const grouped = {
    new: items.filter(l => l.status === 'new'),
    contacted: items.filter(l => l.status === 'contacted'),
    quoted: items.filter(l => l.status === 'quoted'),
    negotiating: items.filter(l => l.status === 'negotiating'),
    booked: items.filter(l => l.status === 'booked'),
    rejected: items.filter(l => l.status === 'rejected'),
  };
  res.json({ success: true, data: grouped });
});

exports.createLead = catchAsync(async (req, res) => {
  const item = await Lead.create(req.body);

  // Send notification email (don't await so we don't delay the response)
  emailService.sendContactEmail(item);

  res.status(201).json({ success: true, data: item });
});

exports.updateLead = catchAsync(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) throw new AppError('Lead not found', 404);

  const updates = { ...req.body };

  // Auto-set conversion timestamps on status transitions
  if (updates.status && updates.status !== lead.status) {
    if (updates.status === 'contacted' && !lead.conversions?.firstContactedAt) {
      updates['conversions.firstContactedAt'] = new Date();
    }
    if (updates.status === 'quoted' && !lead.conversions?.quoteProvidedAt) {
      updates['conversions.quoteProvidedAt'] = new Date();
    }
    if (updates.status === 'negotiating' && !lead.conversions?.negotiationStartedAt) {
      updates['conversions.negotiationStartedAt'] = new Date();
    }
    if (updates.status === 'booked' && !lead.conversions?.bookedAt) {
      updates['conversions.bookedAt'] = new Date();
    }
  }

  const item = await Lead.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  res.json({ success: true, data: item });
});

exports.deleteLead = catchAsync(async (req, res) => {
  const item = await Lead.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!item) throw new AppError('Lead not found', 404);
  res.json({ success: true, message: 'Deleted successfully' });
});
