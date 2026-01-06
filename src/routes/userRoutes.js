const express = require("express");
const router = express.Router();

const {
  authenticateBearer,
  requireAdminOrEmployee,
  requireAdmin,
} = require("../middlewares/authMiddleware");

const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getCustomers,
  getUsersStats,
  updatePassword,
  getStaffUsers,
  login,
  forgotPassword,
  resetPassword,
  refreshTokenHandler,
  logout,
} = require("../controllers/userController");

// PUBLIC
router.post("/user/create", createUser);
router.post("/user/login", login);
router.post("/user/forgot-password", forgotPassword);
router.post("/user/reset-password", resetPassword);
router.post("/user/refresh-token", refreshTokenHandler);
router.post("/user/logout",authenticateBearer, logout); 


// PROTEGIDAS (ADMIN o EMPLOYEE)
router.get("/user/all", authenticateBearer, requireAdminOrEmployee, getAllUsers);
router.get("/user-customers", authenticateBearer, requireAdminOrEmployee, getCustomers);
router.get("/user-stats", authenticateBearer, requireAdminOrEmployee, getUsersStats);
router.get("/users/staff", authenticateBearer, requireAdminOrEmployee, getStaffUsers);
router.delete("/user/:id", authenticateBearer, requireAdmin, deleteUser);

// PROTEGIDAS (autenticado)
router.get("/user/:id", authenticateBearer, getUserById);
router.put("/user/:id", authenticateBearer, updateUser);
router.put("/user/password/:id", authenticateBearer, updatePassword);


module.exports = router;
