const jwt = require('jsonwebtoken');

// middleware to protect routes
const authMiddleware = (req, res, next) => {
  // TODO: extract token from header
  // TODO: verify token
  // TODO: attach user to request
};

module.exports = authMiddleware;
