const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser,updateUserRole } = require('../controllers/userController');
const { verifyToken } = require('../model/verifyToken'); 


router.get('/users', verifyToken, getUsers);

router.put('/users/:id', verifyToken, updateUser);
router.put('/users/:id/role', verifyToken, updateUserRole);


router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;

