const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getHome, updateHome,
  getSettings, updateSettings,
  getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  getAllClients, createClient, updateClient, deleteClient,
  getAllLeads, createLead, updateLead, deleteLead,
  getProcessSteps, createProcessStep, updateProcessStep, deleteProcessStep,
  getWhyFeatures, createWhyFeature, updateWhyFeature, deleteWhyFeature
} = require('../controllers/cmsController');

// ── Public Routes ───────────────────────────────────────────────────────────
router.get('/home', getHome);
router.get('/settings', getSettings);
router.get('/testimonials', getAllTestimonials);
router.get('/clients', getAllClients);
router.get('/process-steps', getProcessSteps);
router.get('/why-features', getWhyFeatures);
router.post('/leads', createLead);

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

router.get('/leads', protect, getAllLeads);
router.put('/leads/:id', protect, updateLead);
router.delete('/leads/:id', protect, deleteLead);

module.exports = router;
