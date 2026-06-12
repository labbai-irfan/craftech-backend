const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String }, // Cloudinary URL
  imagePublicId: { type: String },
  features: [{ type: String }],
  inquiryLink: { type: String, default: '#contact' },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    ogImage: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
