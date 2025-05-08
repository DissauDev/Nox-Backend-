const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    updatePassword,
    login,
  } = require('../controllers/userController');


router.post('/user/create', createUser);
router.post('/user/login', login);
router.get('/user/all', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.put('/user/password/:id', updatePassword);
router.delete('/user/:id', deleteUser);

module.exports = router;