// app.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// Rutas
const productRoutes = require('./src/routes/productRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const menuRoutes = require('./src/routes/menuRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const userRoutes = require('./src/routes/userRoutes');
const stripeRoutes = require('./src/routes/stripeRoutes');
const pageRoutes = require("./src/routes/pageRoutes");
const categoriesRoutes = require("./src/routes/categoriesRoutes");
const optionGroupRoutes = require('./src/routes/optionGroupRoutes');
const analiticsRoutes = require('./src/routes/analiticsRoutes');
const settingRoutes = require('./src/routes/settingRoutes');
const couponRoutes = require('./src/routes/couponRoutes');
const googleSheetRoutes = require('./src/routes/googleSheetsRoutes');

// Middlewares
const errorHandler = require('./src/middlewares/errorHandler');
// Si tienes un rateLimiter, puedes requerirlo aquí opcionalmente
let rateLimiter;
try { rateLimiter = require('./src/middlewares/rateLimiter'); } catch (_) {}

function buildApp({
  enableRateLimit = process.env.NODE_ENV !== 'test',
  trustProxy = 1,
} = {}) {
  const app = express();

  app.set('trust proxy', trustProxy);

  // Seguridad básica
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));

  // Body parsers
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true ,limit: '20mb'}));

  // (Opcional) rate limit, sáltalo en rutas ruidosas o en test
  if (enableRateLimit && rateLimiter) {
    app.use((req, res, next) => {
      if (req.path.startsWith('/uploads')) return next();
      if (req.path.startsWith('/api/stripe/webhook')) return next();
      if (req.path.startsWith('/api/pages')) return next();
      if (req.path.startsWith('/api/menu')) return next();
      return rateLimiter(req, res, next);
    });
  }

  // Rutas “health/ready” para tests y monitoreo
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.get('/ready', (_req, res) => res.json({ ok: true }));

  // Estáticos
  app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'), {
      setHeaders: (res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      },
    })
  );

  // Rutas API
  app.use('/api', productRoutes);
  app.use('/api', orderRoutes);
  app.use('/api', uploadRoutes);
  app.use('/api', stripeRoutes);
  app.use('/api', userRoutes);
  app.use('/api', menuRoutes);
  app.use('/api', pageRoutes);
  app.use('/api', categoriesRoutes);
  app.use('/api', optionGroupRoutes);
  app.use('/api', analiticsRoutes);
  app.use('/api', settingRoutes);
  app.use('/api', couponRoutes);
  app.use('/api', googleSheetRoutes);

  // Errores
  app.use(errorHandler);

  return app;
}

module.exports = { buildApp };
