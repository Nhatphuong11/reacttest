
const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken } = require('../model/verifyToken');
// Lấy danh sách sản phẩm
router.get('/products',verifyToken, getProducts);

// Thêm sản phẩm mới
router.post('/products',verifyToken, addProduct);

// Cập nhật sản phẩm
router.put('/products/:id',verifyToken, updateProduct);

// Xóa sản phẩm
router.delete('/products/:id',verifyToken, deleteProduct);

module.exports = router;
