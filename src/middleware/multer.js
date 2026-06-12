const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const imageStorage = (projectSlug) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `craftech/${projectSlug}/images`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    },
  });

const videoStorage = (projectSlug) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `craftech/${projectSlug}/videos`,
      resource_type: 'video',
      allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    },
  });

const thumbnailStorage = (projectSlug) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `craftech/${projectSlug}/images`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
    },
  });

const highlightVideoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'craftech/highlights/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
  },
});

const highlightThumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'craftech/highlights/thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 450, crop: 'fill', quality: 'auto' }],
  },
});

const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}`), false);
  }
};

const createImageUploader = (projectSlug) =>
  multer({
    storage: imageStorage(projectSlug),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: fileFilter(/^image\//),
  });

const createThumbnailUploader = (projectSlug) =>
  multer({
    storage: thumbnailStorage(projectSlug),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter(/^image\//),
  });

const createVideoUploader = (projectSlug) =>
  multer({
    storage: videoStorage(projectSlug),
    limits: { fileSize: 200 * 1024 * 1024 },
    fileFilter: fileFilter(/^video\//),
  });

const highlightVideoUploader = multer({
  storage: highlightVideoStorage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: fileFilter(/^video\//),
});

const highlightThumbnailUploader = multer({
  storage: highlightThumbnailStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(/^image\//),
});

module.exports = {
  createImageUploader,
  createThumbnailUploader,
  createVideoUploader,
  highlightVideoUploader,
  highlightThumbnailUploader,
};
