const mongoose = require('mongoose');
const slugify = require('slugify');

const videoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String },
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  category: {
    type: String,
    required: true,
    enum: ['Structural Evolution', 'Luxury Fit-Out', 'Architecture & MEP', 'Building Construction', 'Interior Fit Outs', 'MEP Execution', 'Project Management'],
  },
  description: { type: String, required: true },
  client: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  location: { type: String, required: true, trim: true },
  thumbnail: { type: String, required: true },
  thumbnailPublicId: { type: String },
  images: [{ type: String }],
  imagePublicIds: [{ type: String }],
  videos: [videoSchema],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    ogImage: { type: String }
  }
}, { timestamps: true });

projectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// slug index is already created via { unique: true } on the field definition
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });

module.exports = mongoose.model('Project', projectSchema);
