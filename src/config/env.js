// Validate required environment variables on boot
const REQUIRED = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
];

const missing = REQUIRED.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`\n❌ FATAL: Missing required environment variables:\n   ${missing.join('\n   ')}\n`);
  process.exit(1);
}

if (process.env.JWT_SECRET.length < 32) {
  console.error('\n❌ FATAL: JWT_SECRET must be at least 32 characters\n');
  process.exit(1);
}

console.log('✓ Environment validation passed');
