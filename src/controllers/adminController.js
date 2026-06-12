const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Lead = require('../models/Lead');
const ProcessStep = require('../models/ProcessStep');
const WhyFeature = require('../models/WhyFeature');
const Testimonial = require('../models/Testimonial');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError('Email and password are required', 400);

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.json({
    success: true,
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email },
  });
});

exports.getMe = catchAsync(async (req, res) => {
  res.json({ success: true, admin: { id: req.admin._id, name: req.admin.name, email: req.admin.email } });
});

exports.getStats = catchAsync(async (req, res) => {
  const [
    totalProjects, 
    featuredCount, 
    totalLeads,
    totalSteps,
    totalFeatures,
    totalTestimonials
  ] = await Promise.all([
    Project.countDocuments({ isDeleted: { $ne: true } }),
    Project.countDocuments({ featured: true, isDeleted: { $ne: true } }),
    Lead.countDocuments({ isDeleted: { $ne: true } }),
    ProcessStep.countDocuments({ isDeleted: { $ne: true } }),
    WhyFeature.countDocuments({ isDeleted: { $ne: true } }),
    Testimonial.countDocuments({ isDeleted: { $ne: true } }),
  ]);

  const imageStats = await Project.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    { $project: { imageCount: { $size: { $ifNull: ['$images', []] } }, videoCount: { $size: { $ifNull: ['$videos', []] } } } },
    { $group: { _id: null, totalImages: { $sum: '$imageCount' }, totalProjectVideos: { $sum: '$videoCount' } } },
  ]);

  const stats = imageStats[0] || { totalImages: 0, totalProjectVideos: 0 };

  res.json({
    success: true,
    data: {
      totalProjects,
      featuredProjects: featuredCount,
      totalLeads,
      totalSteps,
      totalFeatures,
      totalTestimonials,
      totalImages: stats.totalImages,
      totalProjectVideos: stats.totalProjectVideos,
    },
  });
});

exports.changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) throw new AppError('Both passwords are required', 400);

  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 400);
  }

  admin.password = newPassword;
  await admin.save();
  res.json({ success: true, message: 'Password updated successfully' });
});
