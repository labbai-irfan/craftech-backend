const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { leadSchema } = require('../validation/schemas');
const {
  getHome, updateHome,
  getSettings, updateSettings,
  getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getAllClients, createClient, updateClient, deleteClient,
  getAllLeads, createLead, updateLead, deleteLead, getLeadsByStatus,
  getProcessSteps, createProcessStep, updateProcessStep, deleteProcessStep,
  getWhyFeatures, createWhyFeature, updateWhyFeature, deleteWhyFeature
} = require('../controllers/cmsController');
const { getAllCTAs, getCTABySection, createCTA, updateCTA, deleteCTA } = require('../controllers/ctaController');

// ── Public Routes ───────────────────────────────────────────────────────────
router.get('/home', getHome);
router.get('/settings', getSettings);
router.get('/testimonials', getAllTestimonials);
router.get('/clients', getAllClients);
router.get('/process-steps', getProcessSteps);
router.get('/why-features', getWhyFeatures);
router.get('/ctas', getAllCTAs);
router.get('/ctas/:section', getCTABySection);
router.post('/leads', validate(leadSchema), createLead);

// ── Protected Routes ────────────────────────────────────────────────────────
router.put('/home', protect, updateHome);
router.put('/settings', protect, updateSettings);

// Process Steps
router.post('/process-steps', protect, createProcessStep);
router.put('/process-steps/:id', protect, updateProcessStep);
router.delete('/process-steps/:id', protect, deleteProcessStep);

// Why Features
router.post('/why-features', protect, createWhyFeature);
router.put('/why-features/:id', protect, updateWhyFeature);
router.delete('/why-features/:id', protect, deleteWhyFeature);

router.post('/testimonials', protect, createTestimonial);
router.put('/testimonials/:id', protect, updateTestimonial);
router.delete('/testimonials/:id', protect, deleteTestimonial);

router.post('/clients', protect, createClient);
router.put('/clients/:id', protect, updateClient);
router.delete('/clients/:id', protect, deleteClient);

router.get('/leads/board/status', protect, getLeadsByStatus);
router.get('/leads', protect, getAllLeads);
router.put('/leads/:id', protect, updateLead);
router.delete('/leads/:id', protect, deleteLead);

// CTA Management
router.post('/ctas', protect, createCTA);
router.put('/ctas/:id', protect, updateCTA);
router.delete('/ctas/:id', protect, deleteCTA);

module.exports = router;
