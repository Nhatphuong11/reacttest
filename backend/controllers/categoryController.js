const { cateGorys } = require('../mockdata');

// Lấy danh sách danh mục
const getCategories = (req, res) => {
  res.json(cateGorys);
};

// Thêm danh mục mới
const addCategory = (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).send("categoryName is required");
  }

  const newCategory = {
    categoryid: cateGorys.length + 1,
    categoryName,
  };

  cateGorys.push(newCategory);

  res.status(201).json({
    message: "Category added successfully",
    category: newCategory,
  });
};

// Cập nhật danh mục
const updateCategory = (req, res) => {
  const { categoryid } = req.params;
  const { categoryName } = req.body;

  const category = cateGorys.find((e) => e.categoryid === parseInt(categoryid));

  if (!category) return res.status(404).send("Category not found");

  category.categoryName = categoryName || category.categoryName;

  res.json({
    message: "Category updated successfully",
    category,
  });
};

// Xóa danh mục
const deleteCategory = (req, res) => {
  const { categoryid } = req.params;

  const index = cateGorys.findIndex((c) => c.categoryid === parseInt(categoryid));

  if (index === -1) return res.status(404).send("Category not found");

  cateGorys.splice(index, 1);

  res.json({
    message: "Category deleted successfully",
  });
};

module.exports = { getCategories, addCategory, updateCategory, deleteCategory };
