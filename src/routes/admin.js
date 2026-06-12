const express = require('express');
const router = express.Router();
const { login, getMe, getStats, changePassword } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/stats', protect, getStats);
router.patch('/change-password', protect, changePassword);

module.exports = router;
