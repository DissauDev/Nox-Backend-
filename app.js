require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const productRoutes = require('./src/routes/productRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const menuRoutes = require('./src/routes/menuRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const userRoutes = require('./src/routes/userRoutes');
const stripeRoutes = require('./src/routes/stripeRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
const pageRoutes =  require("./src/routes/pageRoutes");
const path = require('path');
const app = express();

// Seguridad básica
app.use(helmet());
app.use(cors());
app.use(express.json());

// Prevención de ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiadas solicitudes. Inténtalo más tarde.'
});
app.use(limiter);

// Rutas

app.use('/api', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', orderRoutes);
app.use('/api', uploadRoutes);
app.use('/api', stripeRoutes);
app.use('/api', userRoutes);
app.use('/api', menuRoutes);
app.use("/api", pageRoutes);
// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
