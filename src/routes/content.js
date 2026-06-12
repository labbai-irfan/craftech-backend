const express = require('express');
const router = express.Router();
const {
  getAllPillars, createPillar, updatePillar, deletePillar,
  getAllServices, createService, updateService, deleteService,
  getAllHighlightVideos, createHighlightVideo, updateHighlightVideo, deleteHighlightVideo,
} = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

// Core Pillars
router.get('/pillars', getAllPillars);
router.post('/pillars', protect, createPillar);
router.put('/pillars/:id', protect, updatePillar);
router.delete('/pillars/:id', protect, deletePillar);

// Services
router.get('/services', getAllServices);
router.post('/services', protect, createService);
router.put('/services/:id', protect, updateService);
router.delete('/services/:id', protect, deleteService);

// Highlight Videos
router.get('/highlight-videos', getAllHighlightVideos);
router.post('/highlight-videos', protect, createHighlightVideo);
router.put('/highlight-videos/:id', protect, updateHighlightVideo);
router.delete('/highlight-videos/:id', protect, deleteHighlightVideo);

module.exports = router;
