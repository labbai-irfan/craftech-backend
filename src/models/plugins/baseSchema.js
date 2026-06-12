const mongoose = require('mongoose');

const baseSchemaPlugin = (schema) => {
  schema.add({
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    metadata: {
      title: String,
      description: String,
      keywords: String,
      ogImage: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  });

  // Automatically exclude soft-deleted docs from all queries
  const excludeDeleted = function() {
    if (!this.getOptions().withDeleted) {
      this.where({ isDeleted: { $ne: true } });
    }
  };

  schema.pre(['find', 'findOne', 'findOneAndUpdate', 'countDocuments'], excludeDeleted);
};

module.exports = baseSchemaPlugin;
