// src/middlewares/authMiddleware.js
const { verifyAccessToken } = require("../utils/jwtUtils.js");

/**
 * Middleware: verifica access token (Authorization: Bearer <token>)
 * Setea req.user = { id, email, role }
 */
async function authenticateBearer(req, res, next) {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = await verifyAccessToken(token);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    const name = err?.name;

    // ✅ CASOS ESPERADOS → NO LOG
    if (name === "TokenExpiredError") {
      res.set("x-auth-error", "access_expired");
      return res.status(401).json({ message: "Expired token" });
    }

    if (name === "JsonWebTokenError" || name === "NotBeforeError") {
      res.set("x-auth-error", "access_invalid");
      return res.status(401).json({ message: "Invalid token" });
    }

    // ❗ ERROR REAL / INESPERADO → SÍ LOG
    console.error("[auth] verifyAccessToken unexpected error", {
      name: err?.name,
      message: err?.message,
      stack: err?.stack,
    });

    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * Factory: requiere que el usuario tenga uno de los roles permitidos
 */
function requireRoles(...allowedRoles) {
  const allowed = new Set(allowedRoles);

  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!allowed.has(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    return next();
  };
}

const requireAdminOrEmployee = requireRoles("ADMIN", "EMPLOYEE");
const requireAdmin = requireRoles("ADMIN");

module.exports = {
  authenticateBearer,
  requireRoles,
  requireAdminOrEmployee,
  requireAdmin,
};
