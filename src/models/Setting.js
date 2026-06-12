const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const settingSchema = new mongoose.Schema({
  // ── Company Identity ────────────────────────────────────────────
  companyName: { type: String, required: true },
  companyTagline: { type: String },
  companyDescription: { type: String },
  foundedYear: { type: Number },
  totalProjects: { type: Number, default: 25 },
  yearsExperience: { type: Number, default: 12 },

  // ── Contact Information (Single Source of Truth) ───────────────
  primaryPhone: { type: String, required: true },
  alternatePhone: { type: String },
  whatsappNumber: { type: String },
  businessEmail: { type: String, required: true },
  supportEmail: { type: String },

  // ── Office Location ─────────────────────────────────────────────
  officeAddress: { type: String, required: true },
  city: { type: String, default: 'Mumbai' },
  state: { type: String, default: 'Maharashtra' },
  country: { type: String, default: 'India' },
  postalCode: { type: String },
  officePhone: { type: String },
  mapEmbedUrl: { type: String },
  mapCoordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },

  // ── Business Hours ──────────────────────────────────────────────
  businessHours: {
    monday: { open: { type: String, default: '10:00' }, close: { type: String, default: '18:00' }, isOpen: { type: Boolean, default: true } },
    tuesday: { open: { type: String, default: '10:00' }, close: { type: String, default: '18:00' }, isOpen: { type: Boolean, default: true } },
    wednesday: { open: { type: String, default: '10:00' }, close: { type: String, default: '18:00' }, isOpen: { type: Boolean, default: true } },
    thursday: { open: { type: String, default: '10:00' }, close: { type: String, default: '18:00' }, isOpen: { type: Boolean, default: true } },
    friday: { open: { type: String, default: '10:00' }, close: { type: String, default: '18:00' }, isOpen: { type: Boolean, default: true } },
    saturday: { open: { type: String, default: '10:00' }, close: { type: String, default: '14:00' }, isOpen: { type: Boolean, default: true } },
    sunday: { open: { type: String }, close: { type: String }, isOpen: { type: Boolean, default: false } },
  },

  // ── Social & Digital ────────────────────────────────────────────
  socialLinks: {
    instagram: { type: String },
    linkedin: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
  },
  website: { type: String },
  googleBusinessProfile: { type: String },

  // ── CTA Settings (Control every CTA from admin) ────────────────
  primaryCTA: {
    text: { type: String, default: 'Book a Free Site Visit' },
    action: { type: String, enum: ['scroll', 'modal', 'link'], default: 'scroll' },
    target: { type: String, default: '#contact' }
  },
  secondaryCTA: {
    text: { type: String, default: 'View Our Projects' },
    action: { type: String, enum: ['scroll', 'link'], default: 'link' },
    target: { type: String, default: '/projects' }
  },

  // ── Footer Settings ────────────────────────────────────────────
  footerText: { type: String },
  copyrightText: { type: String, default: '© 2026 Craftech Engineers Pvt. Ltd. All rights reserved.' },
  privacyPolicyUrl: { type: String },
  termsOfServiceUrl: { type: String },
  disclaimerText: { type: String },

  // ── Notifications ──────────────────────────────────────────────
  notifyOnNewLead: { type: Boolean, default: true },
  leadNotificationEmail: { type: String },
  enableContactFormCaptcha: { type: Boolean, default: false },

  // ── Branding ───────────────────────────────────────────────────
  logoUrl: { type: String },
  faviconUrl: { type: String },
  brandColor: { type: String, default: '#0A2647' },
  accentColor: { type: String, default: '#C41B1F' },

  // ── SEO Defaults ───────────────────────────────────────────────
  seoDefaultTitle: { type: String },
  seoDefaultDescription: { type: String },
  seoOgImage: { type: String },
  googleAnalyticsId: { type: String },
  googleSearchConsoleId: { type: String },

  // ── API Configuration ─────────────────────────────────────────
  isLive: { type: Boolean, default: true },
  maintenanceMode: { type: Boolean, default: false },
  maintenanceMessage: { type: String },
}, { timestamps: true });

settingSchema.plugin(baseSchema);

module.exports = mongoose.model('Setting', settingSchema);
