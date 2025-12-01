const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../models/User.model');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return next(new AppError('User not found', 404));
      }

      if (req.user.status !== 'active') {
        return next(new AppError('Account is suspended or deleted', 403));
      }

      next();
    } catch (err) {
      return next(new AppError('Not authorized to access this route', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Grant access to specific roles
exports.authorize = (...accountTypes) => {
  return (req, res, next) => {
    if (!accountTypes.includes(req.user.accountType)) {
      return next(
        new AppError(
          `User account type ${req.user.accountType} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Check if user is premium
exports.requirePremium = (req, res, next) => {
  if (!req.user.premium.active) {
    return next(new AppError('Premium membership required', 403));
  }

  // Check if premium has expired
  if (req.user.premium.expiresAt && new Date(req.user.premium.expiresAt) < new Date()) {
    req.user.premium.active = false;
    req.user.save();
    return next(new AppError('Premium membership has expired', 403));
  }

  next();
};

// Optional auth - doesn't fail if no token
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Token invalid, but continue without user
        req.user = null;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
