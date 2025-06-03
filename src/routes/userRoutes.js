const express = require('express');
const router = express.Router();

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
    logout
  } = require('../controllers/userController');


router.post('/user/create', createUser);
router.post('/user/login', login);
router.get('/user/all', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.put('/user/password/:id', updatePassword);
router.delete('/user/:id', deleteUser);
router.get('/user-customers', getCustomers);       // detalle por usuario
router.get('/user-stats', getUsersStats); 
router.get('/users/staff', getStaffUsers);
router.post('/user/logout', logout);
router.post('/user/reset-password', resetPassword);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/refresh-token', refreshTokenHandler);


module.exports = router;