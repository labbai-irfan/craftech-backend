const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadBuffer = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });

const uploadImages = async (req, res) => {
  const { projectSlug } = req.params;
  if (!req.files || !req.files.length) {
    return res.status(400).json({ success: false, message: 'No image files uploaded' });
  }

  const results = await Promise.all(
    req.files.map((file) =>
      uploadBuffer(file.buffer, {
        folder: `craftech/${projectSlug}/images`,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })
    )
  );

  res.json({
    success: true,
    data: results.map((r) => ({ url: r.secure_url, publicId: r.public_id })),
  });
};

const uploadVideo = async (req, res) => {
  const { projectSlug } = req.params;
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No video file uploaded' });
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: `craftech/${projectSlug}/videos`,
    resource_type: 'video',
  });

  res.json({
    success: true,
    data: { url: result.secure_url, publicId: result.public_id },
  });
};

const uploadThumbnail = async (req, res) => {
  const { projectSlug } = req.params;
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No thumbnail file uploaded' });
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: `craftech/${projectSlug}/images`,
    transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
  });

  res.json({
    success: true,
    data: { url: result.secure_url, publicId: result.public_id },
  });
};

const uploadHighlightVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No video file uploaded' });
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: 'craftech/highlights/videos',
    resource_type: 'video',
  });

  res.json({
    success: true,
    data: { url: result.secure_url, publicId: result.public_id },
  });
};

const uploadHighlightThumbnail = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No thumbnail file uploaded' });
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: 'craftech/highlights/thumbnails',
    transformation: [{ width: 800, height: 450, crop: 'fill', quality: 'auto' }],
  });

  res.json({
    success: true,
    data: { url: result.secure_url, publicId: result.public_id },
  });
};

const uploadCmsImage = async (req, res) => {
  const folder = req.query.folder || 'misc';
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: `craftech/cms/${folder}`,
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });

  res.json({
    success: true,
    data: { url: result.secure_url, publicId: result.public_id },
  });
};

module.exports = {
  uploadImages, uploadVideo, uploadThumbnail,
  uploadHighlightVideo, uploadHighlightThumbnail, uploadCmsImage,
};
