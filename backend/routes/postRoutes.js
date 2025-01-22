const express = require('express');
const router = express.Router();
const { getPosts, addPosts, updatePosts, deletePosts } = require('../controllers/postController');
const { verifyToken } = require('../model/verifyToken');
// Lấy danh sách sản phẩm
router.get('/posts',verifyToken, getPosts);

// Thêm sản phẩm mới
router.post('/posts',verifyToken, addPosts);

// Cập nhật sản phẩm
router.put('/posts/:id',verifyToken, updatePosts);

// Xóa sản phẩm
router.delete('/posts/:id',verifyToken, deletePosts);

module.exports = router;
