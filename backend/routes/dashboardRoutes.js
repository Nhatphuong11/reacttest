// dashboardRouter.js
const express = require("express");
const {
  getDashboardSummary,
  getProductStatistics,
  getOrderStatistics,
} = require("../controllers/dashboardController");

const router = express.Router();

// Route tổng quan
router.get("/summary", getDashboardSummary);

// Route thống kê sản phẩm
router.get("/product-statistics", getProductStatistics);

// Route thống kê đơn hàng
router.get("/order-statistics", getOrderStatistics);

module.exports = router;
