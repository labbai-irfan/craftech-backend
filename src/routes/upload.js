const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const {
  uploadImages, uploadVideo, uploadThumbnail,
  uploadHighlightVideo, uploadHighlightThumbnail, uploadCmsImage,
} = require('../controllers/uploadController');

// Memory storage — upload to Cloudinary via buffer in controller
const memoryStorage = multer({ storage: multer.memoryStorage() });

router.post('/:projectSlug/images', protect, memoryStorage.array('images', 20), uploadImages);
router.post('/:projectSlug/video', protect, memoryStorage.single('video'), uploadVideo);
router.post('/:projectSlug/thumbnail', protect, memoryStorage.single('thumbnail'), uploadThumbnail);

router.post('/highlights/video', protect, memoryStorage.single('video'), uploadHighlightVideo);
router.post('/highlights/thumbnail', protect, memoryStorage.single('thumbnail'), uploadHighlightThumbnail);

module.exports = router;
