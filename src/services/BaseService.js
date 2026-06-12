const AppError = require('../utils/AppError');

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll(query = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt', populate = '' } = options;
    const skip = (page - 1) * limit;

    // Filter out soft-deleted items (handled by plugin but good to be explicit)
    const filter = { ...query, isDeleted: { $ne: true } };

    const data = await this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);

    const total = await this.model.countDocuments(filter);

    return {
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getOne(filter, populate = '') {
    const item = await this.model.findOne({ ...filter, isDeleted: { $ne: true } }).populate(populate);
    if (!item) throw new AppError('Resource not found', 404);
    return item;
  }

  async create(data, userId) {
    if (userId) data.createdBy = userId;
    return await this.model.create(data);
  }

  async update(id, data, userId) {
    if (userId) data.updatedBy = userId;
    const item = await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!item) throw new AppError('Resource not found', 404);
    return item;
  }

  async delete(id) {
    // Soft delete
    const item = await this.model.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (!item) throw new AppError('Resource not found', 404);
    return item;
  }

  async hardDelete(id) {
    const item = await this.model.findByIdAndDelete(id);
    if (!item) throw new AppError('Resource not found', 404);
    return item;
  }
}

module.exports = BaseService;
