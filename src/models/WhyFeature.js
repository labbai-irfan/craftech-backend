const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const whyFeatureSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // FontAwesome icon class or key
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

whyFeatureSchema.plugin(baseSchema);

module.exports = mongoose.model('WhyFeature', whyFeatureSchema);
