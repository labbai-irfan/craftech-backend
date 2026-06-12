const Home = require('../models/Home');
const Setting = require('../models/Setting');
const ProcessStep = require('../models/ProcessStep');
const WhyFeature = require('../models/WhyFeature');

class CMSService {
  async getHome() {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create({
        heroSlides: [{
          title: 'Building Legacy, Engineering Trust.',
          subtitle: 'Mumbai\'s leading partner for turn-key construction and technical fit-outs.',
          image: 'https://res.cloudinary.com/dcx2gs6mm/image/upload/v1775114390/31_j0lbxw.jpg'
        }],
        aboutTitle: 'Technical Precision Since 2012.',
        aboutDescription: 'Craftech specializes in structural developments and specialized MEP systems.',
        stats: [
          { label: 'Projects Executed', value: '25' },
          { label: 'Years Evolution', value: '12' }
        ]
      });
    }
    return home;
  }

  async updateHome(data, userId) {
    let home = await Home.findOne();
    if (!home) {
      return await Home.create({ ...data, createdBy: userId });
    }
    return await Home.findByIdAndUpdate(home._id, { $set: data, updatedBy: userId }, { new: true });
  }

  async getProcessSteps() {
    return await ProcessStep.find().sort({ displayOrder: 1, number: 1 });
  }

  async getWhyFeatures() {
    return await WhyFeature.find().sort({ displayOrder: 1 });
  }

  async getSettings() {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({
        companyName: 'Craftech Engineers',
        email: 'info@craftechengineers.com',
        phone: '+91 1234567890',
        address: 'Mumbai, India',
      });
    }
    return setting;
  }

  async updateSettings(data, userId) {
    let setting = await Setting.findOne();
    if (!setting) {
      return await Setting.create({ ...data, createdBy: userId });
    }
    return await Setting.findByIdAndUpdate(setting._id, { $set: data, updatedBy: userId }, { new: true });
  }
}

module.exports = new CMSService();
