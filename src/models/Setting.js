const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const settingSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String }
  },
  googleMapLink: { type: String },
}, { timestamps: true });

settingSchema.plugin(baseSchema);

module.exports = mongoose.model('Setting', settingSchema);
