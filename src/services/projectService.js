const BaseService = require('./BaseService');
const Project = require('../models/Project');

class ProjectService extends BaseService {
  constructor() {
    super(Project);
  }

  async getFeatured() {
    return await this.getAll({ featured: true, status: 'published' }, { limit: 6 });
  }

  async getBySlug(slug) {
    return await this.getOne({ slug, status: 'published' });
  }
}

module.exports = new ProjectService();
