const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser,updateUserRole } = require('../controllers/userController');
const { verifyToken } = require('../model/verifyToken'); // Middleware kiểm tra token

// Lấy danh sách người dùng (chỉ cho admin)
router.get('/users', verifyToken, getUsers);

// Cập nhật người dùng (chỉ cho admin)
router.put('/users/:id', verifyToken, updateUser);
router.put('/users/:id/role', verifyToken, updateUserRole);

// Xóa người dùng (chỉ cho admin)
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;

