const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // extract token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // TODO: verify token
  // TODO: attach user to request
};

module.exports = authMiddleware;
