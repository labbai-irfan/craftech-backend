const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  projectType: { type: String },
  budget: { type: String },  // e.g., "10-25L", "25-50L", "50L+"
  timeline: { type: String },  // e.g., "immediate", "1-3 months", "3-6 months"

  // CRM Pipeline Status (replaces old 'contacted' boolean)
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'negotiating', 'booked', 'rejected'],
    default: 'new'
  },

  // Source attribution
  source: {
    type: String,
    enum: ['contact-form', 'whatsapp-cta', 'callback-request', 'quote-form', 'phone-call', 'other'],
    default: 'contact-form'
  },
  sourceDetails: { type: String },  // e.g., "Hero section CTA" or "Services page"

  // Sales pipeline metadata
  assignedTo: { type: String },  // Sales rep name/ID
  quotedAmount: { type: Number },  // In Lakhs
  notes: { type: String },
  followUpDate: { type: Date },

  // Conversion tracking
  conversions: {
    firstContactedAt: Date,
    quoteProvidedAt: Date,
    negotiationStartedAt: Date,
    bookedAt: Date
  }
}, { timestamps: true });

leadSchema.plugin(baseSchema);

module.exports = mongoose.model('Lead', leadSchema);
