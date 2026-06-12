const projectService = require('../services/projectService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudinary');

exports.getAllProjects = catchAsync(async (req, res) => {
  const result = await projectService.getAll(req.query, {
    page: req.query.page,
    limit: req.query.limit,
    sort: req.query.sort || '-createdAt'
  });
  res.json({ success: true, ...result });
});

exports.getProjectBySlug = catchAsync(async (req, res) => {
  const data = await projectService.getBySlug(req.params.slug);
  res.json({ success: true, data });
});

exports.getProjectById = catchAsync(async (req, res) => {
  const data = await projectService.getOne({ _id: req.params.id });
  res.json({ success: true, data });
});

exports.createProject = catchAsync(async (req, res) => {
  const data = await projectService.create(req.body, req.admin?._id);
  res.status(201).json({ success: true, data });
});

exports.updateProject = catchAsync(async (req, res) => {
  const data = await projectService.update(req.params.id, req.body, req.admin?._id);
  res.json({ success: true, data });
});

exports.deleteProject = catchAsync(async (req, res) => {
  await projectService.delete(req.params.id);
  res.json({ success: true, message: 'Project deleted successfully' });
});

// Media specific methods (can be moved to a MediaService later)
exports.addImagesToProject = catchAsync(async (req, res) => {
  const { urls, publicIds } = req.body;
  const project = await projectService.getOne({ _id: req.params.id });
  
  project.images.push(...urls);
  if (publicIds?.length) project.imagePublicIds.push(...publicIds);
  await project.save();

  res.json({ success: true, data: project });
});

exports.removeImageFromProject = catchAsync(async (req, res) => {
  const { id, imageIndex } = req.params;
  const project = await projectService.getOne({ _id: id });

  const idx = parseInt(imageIndex);
  const publicId = project.imagePublicIds[idx];
  if (publicId) {
    await cloudinary.uploader.destroy(publicId).catch(() => {});
  }

  project.images.splice(idx, 1);
  project.imagePublicIds.splice(idx, 1);
  await project.save();

  res.json({ success: true, data: project });
});

exports.addVideoToProject = catchAsync(async (req, res) => {
  const { label, url, publicId } = req.body;
  const project = await projectService.getOne({ _id: req.params.id });
  
  project.videos.push({ label, url, publicId });
  await project.save();

  res.json({ success: true, data: project });
});

exports.removeVideoFromProject = catchAsync(async (req, res) => {
  const { id, videoId } = req.params;
  const project = await projectService.getOne({ _id: id });

  const video = project.videos.id(videoId);
  if (video?.publicId) {
    await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' }).catch(() => {});
  }

  project.videos.pull(videoId);
  await project.save();

  res.json({ success: true, data: project });
});
