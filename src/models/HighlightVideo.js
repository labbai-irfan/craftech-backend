const mongoose = require('mongoose');

const highlightVideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  duration: { type: String },
  url: { type: String, required: true },
  publicId: { type: String },
  thumbnailUrl: { type: String },
  thumbnailPublicId: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('HighlightVideo', highlightVideoSchema);
