const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const AppError = require('../utils/AppError');
const {
  uploadImages, uploadVideo, uploadThumbnail,
  uploadHighlightVideo, uploadHighlightThumbnail, uploadCmsImage,
} = require('../controllers/uploadController');

// File type validators
const imageFilter = (req, f, cb) => {
  if (/^image\/(jpe?g|png|webp)$/.test(f.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WebP images allowed'), false);
  }
};

const videoFilter = (req, f, cb) => {
  if (/^video\/(mp4|quicktime|webm)$/.test(f.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only MP4, MOV, WebM videos allowed'), false);
  }
};

// Validate projectSlug to prevent path traversal
const validateSlug = (req, res, next) => {
  const slug = req.params.projectSlug;
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) {
    return next(new AppError('Invalid project slug', 400));
  }
  next();
};

// Memory storage with limits
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 20 },
  fileFilter: imageFilter
});

const videoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024, files: 1 },
  fileFilter: videoFilter
});

const thumbnailUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter
});

const highlightVideoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: videoFilter
});

const highlightThumbnailUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter
});

router.post('/:projectSlug/images', protect, validateSlug, imageUpload.array('images'), uploadImages);
router.post('/:projectSlug/video', protect, validateSlug, videoUpload.single('video'), uploadVideo);
router.post('/:projectSlug/thumbnail', protect, validateSlug, thumbnailUpload.single('thumbnail'), uploadThumbnail);

router.post('/highlights/video', protect, highlightVideoUpload.single('video'), uploadHighlightVideo);
router.post('/highlights/thumbnail', protect, highlightThumbnailUpload.single('thumbnail'), uploadHighlightThumbnail);

module.exports = router;
