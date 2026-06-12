require('dotenv').config();
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const CorePillar = require('./models/CorePillar');
const Service = require('./models/Service');

const seed = async () => {
  await connectDB();

  // Admin
  const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!adminExists) {
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Craftech Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log('Admin created:', process.env.ADMIN_EMAIL);
  } else {
    console.log('Admin already exists, skipping.');
  }

  // Core Pillars
  const pillarCount = await CorePillar.countDocuments();
  if (!pillarCount) {
    await CorePillar.insertMany([
      { title: 'Integrity & Trust', description: 'We operate with complete transparency, maintaining honesty in every project, budget, and timeline commitment.', icon: 'shield-check', color: 'navy', order: 1 },
      { title: 'Precision Engineering', description: 'Every detail matters. Our team applies rigorous technical standards to deliver flawless structural and interior results.', icon: 'cog', color: 'red', order: 2 },
      { title: 'Innovation', description: 'We embrace modern construction technologies and methodologies to deliver smarter, faster, and more sustainable solutions.', icon: 'lightbulb', color: 'gold', order: 3 },
      { title: 'Total Accountability', description: 'From consultation to handover, we own every outcome. Our clients can count on us to deliver on every promise made.', icon: 'check-circle', color: 'navy', order: 4 },
    ]);
    console.log('Core Pillars seeded.');
  }

  // Services
  const serviceCount = await Service.countDocuments();
  if (!serviceCount) {
    await Service.insertMany([
      { title: 'Building Construction', description: 'End-to-end structural construction services for residential and commercial projects, from foundation to finishing.', icon: 'building', order: 1 },
      { title: 'Interior Fit Outs', description: 'Bespoke interior fit-out services combining aesthetic elegance with functional excellence for premium spaces.', icon: 'home', order: 2 },
      { title: 'MEP Execution', description: 'Comprehensive Mechanical, Electrical, and Plumbing execution by certified specialists ensuring full code compliance.', icon: 'zap', order: 3 },
      { title: 'Project Management', description: 'End-to-end project management ensuring on-time, within-budget delivery through Lean Construction methodologies.', icon: 'clipboard', order: 4 },
      { title: 'Quantity Survey', description: 'Accurate quantity surveying and cost estimation services to control budgets and reduce financial risk.', icon: 'calculator', order: 5 },
      { title: 'Cost Consultancy', description: 'Strategic cost consultancy providing value engineering, budget planning, and procurement advisory services.', icon: 'trending-up', order: 6 },
    ]);
    console.log('Services seeded.');
  }

  console.log('Seed complete.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
