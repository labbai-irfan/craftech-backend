const CorePillar = require('../models/CorePillar');
const Service = require('../models/Service');
const HighlightVideo = require('../models/HighlightVideo');
const cloudinary = require('../config/cloudinary');

// ── Core Pillars ────────────────────────────────────────────────────────────

const getAllPillars = async (req, res) => {
  const pillars = await CorePillar.find().sort({ order: 1 });
  res.json({ success: true, data: pillars });
};

const createPillar = async (req, res) => {
  const pillar = await CorePillar.create(req.body);
  res.status(201).json({ success: true, data: pillar });
};

const updatePillar = async (req, res) => {
  const pillar = await CorePillar.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!pillar) return res.status(404).json({ success: false, message: 'Pillar not found' });
  res.json({ success: true, data: pillar });
};

const deletePillar = async (req, res) => {
  const pillar = await CorePillar.findByIdAndDelete(req.params.id);
  if (!pillar) return res.status(404).json({ success: false, message: 'Pillar not found' });
  res.json({ success: true, message: 'Pillar deleted' });
};

// ── Services ─────────────────────────────────────────────────────────────────

const getAllServices = async (req, res) => {
  const filter = req.query.active === 'true' ? { active: true } : {};
  const services = await Service.find(filter).sort({ order: 1 });
  res.json({ success: true, data: services });
};

const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
};

const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: service });
};

const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, message: 'Service deleted' });
};

// ── Highlight Videos ─────────────────────────────────────────────────────────

const getAllHighlightVideos = async (req, res) => {
  const filter = {};
  if (req.query.featured === 'true') filter.featured = true;
  const videos = await HighlightVideo.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: videos });
};

const createHighlightVideo = async (req, res) => {
  const video = await HighlightVideo.create(req.body);
  res.status(201).json({ success: true, data: video });
};

const updateHighlightVideo = async (req, res) => {
  const video = await HighlightVideo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
  res.json({ success: true, data: video });
};

const deleteHighlightVideo = async (req, res) => {
  const video = await HighlightVideo.findById(req.params.id);
  if (!video) return res.status(404).json({ success: false, message: 'Video not found' });

  const cleanups = [];
  if (video.publicId) cleanups.push(cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' }));
  if (video.thumbnailPublicId) cleanups.push(cloudinary.uploader.destroy(video.thumbnailPublicId));
  await Promise.allSettled(cleanups);

  await HighlightVideo.deleteOne({ _id: video._id });
  res.json({ success: true, message: 'Video deleted' });
};

module.exports = {
  getAllPillars, createPillar, updatePillar, deletePillar,
  getAllServices, createService, updateService, deleteService,
  getAllHighlightVideos, createHighlightVideo, updateHighlightVideo, deleteHighlightVideo,
};
