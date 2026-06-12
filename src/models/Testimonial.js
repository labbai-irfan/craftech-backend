const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const testimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  role: { type: String }, // designation
  company: { type: String },
  text: { type: String, required: true }, // review
  image: { type: String }, // Cloudinary URL
  imagePublicId: { type: String },
  rating: { type: Number, default: 5, min: 1, max: 5 },
}, { timestamps: true });

testimonialSchema.plugin(baseSchema);

module.exports = mongoose.model('Testimonial', testimonialSchema);
