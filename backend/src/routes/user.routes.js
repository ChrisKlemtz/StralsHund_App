const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/me', protect, (req, res) => {
  res.json({ status: 'success', data: req.user });
});

router.put('/me', protect, (req, res) => {
  res.json({ status: 'success', message: 'User update endpoint' });
});

module.exports = router;
