const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes
router.get('/', optionalAuth, (req, res) => {
  res.json({ status: 'success', message: 'Get all meetups endpoint' });
});

router.post('/', protect, (req, res) => {
  res.json({ status: 'success', message: 'Create meetup endpoint' });
});

module.exports = router;
