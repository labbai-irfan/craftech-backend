const mongoose = require('mongoose');

const corePillarSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, default: 'navy', enum: ['navy', 'red', 'gold'] },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CorePillar', corePillarSchema);
