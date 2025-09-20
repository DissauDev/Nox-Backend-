// src/middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: (req, res) => {
    // Usuarios admin/editor: límites más altos (si tienes auth con roles)
    if (req.user?.role === 'ADMIN' || req.user?.role === 'EMPLOYEE') return 600;
    return 120; // base para público
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, try again later.' },
});

module.exports = limiter;
