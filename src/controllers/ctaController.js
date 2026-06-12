const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const CTA = require('../models/CTA');

exports.getAllCTAs = catchAsync(async (req, res) => {
  const items = await CTA.find();
  res.json({ success: true, data: items });
});

exports.getCTABySection = catchAsync(async (req, res) => {
  const { section } = req.params;
  const item = await CTA.findOne({ sectionName: section });
  if (!item) throw new AppError('CTA not found', 404);
  res.json({ success: true, data: item });
});

exports.createCTA = catchAsync(async (req, res) => {
  const item = await CTA.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.updateCTA = catchAsync(async (req, res) => {
  const item = await CTA.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new AppError('CTA not found', 404);
  res.json({ success: true, data: item });
});

exports.deleteCTA = catchAsync(async (req, res) => {
  const item = await CTA.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!item) throw new AppError('CTA not found', 404);
  res.json({ success: true, message: 'Deleted successfully' });
});
