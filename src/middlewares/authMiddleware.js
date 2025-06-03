// src/middlewares/authMiddleware.js
const { verifyAccessToken }= require('../utils/jwtUtils.js');

 async function authenticateBearer(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no provisto' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  try {
    const decoded = await verifyAccessToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch (err) {
    console.error('Error en verifyAccessToken:', err);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
module.exports = { authenticateBearer };