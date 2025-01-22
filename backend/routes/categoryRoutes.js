const express = require("express");
const router = express.Router();
const { getCategories, addCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { verifyToken } = require("../model/verifyToken");

// Lấy danh sách danh mục
router.get("/categories", verifyToken, getCategories);


// Thêm danh mục mới
router.post("/categories", verifyToken, addCategory);

// Cập nhật danh mục
router.put("/categories/:categoryid", verifyToken, updateCategory);

// Xóa danh mục
router.delete("/categories/:categoryid", verifyToken, deleteCategory);

module.exports = router;
