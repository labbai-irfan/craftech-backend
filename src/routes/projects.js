const express = require('express');
const router = express.Router();
const {
  getAllProjects, getProjectBySlug, getProjectById,
  createProject, updateProject, deleteProject,
  addImagesToProject, removeImageFromProject,
  addVideoToProject, removeVideoFromProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getAllProjects);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProjectById);

// Admin-protected
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

router.post('/:id/images', protect, addImagesToProject);
router.delete('/:id/images/:imageIndex', protect, removeImageFromProject);

router.post('/:id/videos', protect, addVideoToProject);
router.delete('/:id/videos/:videoId', protect, removeVideoFromProject);

module.exports = router;
