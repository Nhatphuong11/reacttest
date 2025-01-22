const express = require('express');
const router = express.Router();
const { getAllOrders , addOrder, deleteOrder, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken,verifyAdmin } = require('../model/verifyToken');

// Lấy danh sách đơn hàng
router.get("/orders", verifyToken, verifyAdmin, getAllOrders);

// Thêm đơn hàng mới
router.post('/orders', verifyToken, addOrder);
router.put('/orders/:id/status', verifyToken, updateOrderStatus);
// Xóa đơn hàng
router.delete('/orders/:id', verifyToken, deleteOrder);

module.exports = router;
