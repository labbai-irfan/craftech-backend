const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ProcessStep = require('./src/models/ProcessStep');
const WhyFeature = require('./src/models/WhyFeature');
const Testimonial = require('./src/models/Testimonial');
const Home = require('./src/models/Home');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/craftech';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await ProcessStep.deleteMany({});
    await WhyFeature.deleteMany({});
    await Testimonial.deleteMany({});

    // Seed Process Steps
    await ProcessStep.create([
      { number: '01', title: 'Consultation & Feasibility', description: 'Technical analysis and site evaluation to ensure project viability.', order: 1 },
      { number: '02', title: 'Lean Resource Planning', description: 'Advanced BOQ preparation and logistic optimization to eliminate waste.', order: 2 },
      { number: '03', title: 'Precision Execution', description: 'On-site engineering and MEP integration following strict safety codes.', order: 3 },
      { number: '04', title: 'Technical Handover', description: 'Final snag-free inspection and full documentation delivery.', order: 4 },
    ]);

    // Seed Why Features
    await WhyFeature.create([
      { icon: 'fa-arrows-spin', title: 'Unified Stewardship', description: 'Single point of accountability from design to final key-handover.', order: 1 },
      { icon: 'fa-file-invoice-dollar', title: 'Fiscal Transparency', description: 'Real-time budgetary tracking with zero hidden cost escalations.', order: 2 },
      { icon: 'fa-gear', title: 'MEP Mastery', description: 'Specialized mechanical and electrical systems for high-performance buildings.', order: 3 },
    ]);

    // Seed Testimonials
    await Testimonial.create([
      { author: 'Rajesh Khanna', role: 'Project Director, Mumbai Heights', text: 'Craftech transformed our site logistics. Their MEP integration is the most precise we have seen in the industry.', order: 1 },
      { author: 'Sarah D\'souza', role: 'Lead Architect', text: 'Working with Craftech means zero technical friction. They understand architectural intent and deliver engineering excellence.', order: 2 },
    ]);

    // Ensure Home data exists
    const home = await Home.findOne();
    if (!home) {
      await Home.create({
        heroTitle: 'Building Legacy, Engineering Trust.',
        heroSubtitle: 'Mumbai\'s leading partner for turn-key construction and technical fit-outs.',
        aboutTitle: 'Technical Precision Since 2012.',
        aboutDescription: 'Craftech is a Mumbai-based engineering and construction firm specializing in complex structural developments and high-end MEP systems.',
        aboutExperienceYears: 12,
        aboutQuote: 'Engineering is not just about building structures; it is about building trust that lasts for generations.',
        aboutQuoteAuthor: 'Irfan Shaikh',
        stats: [
          { label: 'Projects Executed', value: '25' },
          { label: 'Completed Deliveries', value: '18' },
          { label: 'Years Evolution', value: '12' }
        ]
      });
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
