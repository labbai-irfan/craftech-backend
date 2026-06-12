const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const ctaSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    enum: ['hero', 'services', 'portfolio', 'testimonials', 'contact'],
    required: true,
    unique: true
  },
  primaryText: {
    type: String,
    required: true,
    default: 'Talk to an Expert'
  },
  primaryUrl: {
    type: String,
    default: '#contact'
  },
  primaryAction: {
    type: String,
    enum: ['scroll', 'modal', 'link'],
    default: 'scroll'
  },
  secondaryText: String,
  secondaryUrl: String,
  secondaryAction: {
    type: String,
    enum: ['scroll', 'modal', 'link'],
  },
  tertiaryText: String,
  tertiaryUrl: String,
  tertiaryAction: {
    type: String,
    enum: ['scroll', 'modal', 'link'],
  },
  description: String,
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

ctaSchema.plugin(baseSchema);

module.exports = mongoose.model('CTA', ctaSchema);
