const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  projectType: { type: String },
  contacted: { type: Boolean, default: false }
}, { timestamps: true });

leadSchema.plugin(baseSchema);

module.exports = mongoose.model('Lead', leadSchema);
