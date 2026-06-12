const mongoose = require('mongoose');
const baseSchema = require('./plugins/baseSchema');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  logoPublicId: { type: String },
  website: { type: String },
}, { timestamps: true });

clientSchema.plugin(baseSchema);

module.exports = mongoose.model('Client', clientSchema);
