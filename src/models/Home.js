const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const homeSchema = new mongoose.Schema({
  // ── Section Visibility & Order ──────────────────────────────────────
  sections: [{
    type: String,
    enum: ['hero', 'stats', 'about', 'services', 'pillars', 'process', 'portfolio', 'videos', 'why', 'testimonials', 'clients', 'contact'],
    required: true
  }],
  sectionOrder: [{
    sectionName: {
      type: String,
      enum: ['hero', 'stats', 'about', 'services', 'pillars', 'process', 'portfolio', 'videos', 'why', 'testimonials', 'clients', 'contact']
    },
    order: { type: Number },
    isVisible: { type: Boolean, default: true }
  }],

  // Hero Section
  heroSlides: [{
    title: { type: String },
    subtitle: { type: String },
    image: { type: String },
    imagePublicId: { type: String },
    order: { type: Number, default: 0 }
  }],
  ctaText: { type: String, default: 'Talk to an Expert' },
  ctaLink: { type: String, default: '#contact' },

  // About Section
  aboutTitle: { type: String },
  aboutSubtitle: { type: String },
  aboutDescription: { type: String },
  aboutMainImage: { type: String },
  aboutMainImagePublicId: { type: String },
  aboutQuote: { type: String },
  aboutQuoteAuthor: { type: String },
  aboutExperienceYears: { type: Number, default: 12 },

  stats: [{
    label: { type: String },
    value: { type: String }
  }]
}, { timestamps: true });

homeSchema.plugin(baseSchema);

module.exports = mongoose.model('Home', homeSchema);
