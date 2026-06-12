const { z } = require('zod');

// Lead submission (contact form)
exports.leadSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().trim().email('Invalid email address').max(120),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{7,14}$/, 'Invalid phone format'),
  projectType: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000),
  budget: z.string().trim().max(50).optional(),
  timeline: z.string().trim().max(50).optional(),
  source: z.enum(['contact-form', 'whatsapp-cta', 'callback-request', 'quote-form', 'phone-call', 'other']).optional(),
  sourceDetails: z.string().trim().max(200).optional(),
  website: z.string().max(0, 'Invalid request').optional().catch(''),  // Honeypot
}).strict();

// Lead status update (admin)
exports.leadUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'quoted', 'negotiating', 'booked', 'rejected']).optional(),
  assignedTo: z.string().trim().max(100).optional(),
  quotedAmount: z.number().positive().optional(),
  notes: z.string().trim().max(2000).optional(),
  followUpDate: z.string().datetime().optional(),
}).strict();

// Project create/update
exports.projectSchema = z.object({
  title: z.string().trim().min(3, 'Title required').max(150),
  category: z.enum(['Structural Evolution', 'Luxury Fit-Out', 'Architecture & MEP', 'Building Construction', 'Interior Fit Outs', 'MEP Execution', 'Project Management']),
  description: z.string().trim().min(10).max(5000),
  client: z.string().trim().min(2).max(100),
  year: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  location: z.string().trim().min(2).max(200),
  featured: z.boolean().optional(),
}).strict();

// Service create/update
exports.serviceSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(2000),
  icon: z.string().trim().min(2).max(50),
  active: z.boolean().optional(),
}).strict();

// Settings update
exports.settingsSchema = z.object({
  companyName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{7,14}$/),
  address: z.string().trim().min(5).max(300),
  whatsappNumber: z.string().trim().regex(/^[+\d][\d\s()-]{7,14}$/).optional(),
  socialLinks: z.record(z.string().url().optional()).optional(),
}).strict();

// Admin login
exports.loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
}).strict();
