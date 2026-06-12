require('dotenv').config();
require('./config/env');  // Validate env vars before anything else
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const adminRoutes = require('./routes/admin');
const projectRoutes = require('./routes/projects');
const uploadRoutes = require('./routes/upload');
const contentRoutes = require('./routes/content');
const cmsRoutes = require('./routes/cms');
const globalErrorHandler = require('./middleware/errorMiddleware');

const app = express();

connectDB();

app.set('trust proxy', 1);  // Trust X-Forwarded-For header for accurate rate limiting in reverse proxy
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 200 : 2000, // Increased for development
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts, please try again after 15 minutes.',
});
app.use('/api/admin/login', authLimiter);

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 5,
  message: 'Too many inquiries from this IP. Please try again later.',
  skip: (req) => req.body?.website,  // Skip honeypot-filled requests
});
app.use('/api/cms/leads', leadLimiter);

app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/cms', cmsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV, timestamp: new Date() });
});

// 404 Route
const AppError = require('./utils/AppError');
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Craftech API running on port ${PORT} [${process.env.NODE_ENV}]`);
});

// Graceful shutdown on SIGTERM (docker stop, k8s termination, etc.)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
  // Force exit after 30s if connections don't close
  setTimeout(() => {
    console.log('Forcing shutdown after 30s timeout');
    process.exit(1);
  }, 30000);
});
