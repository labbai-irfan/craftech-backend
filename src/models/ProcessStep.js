const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const processStepSchema = new mongoose.Schema({
  number: { type: String, required: true }, // e.g. "01"
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

processStepSchema.plugin(baseSchema);

module.exports = mongoose.model('ProcessStep', processStepSchema);
