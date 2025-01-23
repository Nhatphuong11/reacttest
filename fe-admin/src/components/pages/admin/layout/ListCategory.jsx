import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../redux/categorySlice";
import { Button, Modal, Input, Pagination } from "antd";
import "./ListCategory.css";

function ListCategory() {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ categoryName: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading") return <p>Loading categories...</p>;
  if (status === "failed") return <p>Error: {error}</p>;


  const filteredCategories = categories.filter((category) =>
    (category.categoryName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const currentCategories = filteredCategories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.categoryName) {
      alert("Please enter a category name");
      return;
    }

    try {
      await dispatch(addCategory(newCategory));
      setNewCategory({ categoryName: "" });
      setIsModalOpen(false);
      dispatch(fetchCategories());
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory?.categoryName) {
      alert("Please enter a category name");
      return;
    }

    try {
      await dispatch(updateCategory(editingCategory));
      dispatch(fetchCategories());
      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const openEditModal = (category) => {
    setEditingCategory({ ...category });
    setIsEditModalOpen(true);
  };

  return (
    <div className="list-category-container">
      <h2 className="list-category-title">Category List</h2>
      <div className="search-bar">
        <Input
          placeholder="Search by category name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="add-category-btn">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.categoryid}>
                <td>{category.categoryid}</td>
                <td>{category.categoryName}</td>
                <td>
                  <Button
                    onClick={() => openEditModal(category)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={() => handleDelete(category.categoryid)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        current={currentPage}
        pageSize={categoriesPerPage}
        total={filteredCategories.length}
        onChange={(page) => setCurrentPage(page)}
        className="pagination"
      />

      <Modal
        title="Add New Category"
        visible={isModalOpen}
        onOk={handleAddCategory}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Category Name"
          value={newCategory.categoryName}
          onChange={(e) =>
            setNewCategory({ ...newCategory, categoryName: e.target.value })
          }
        />
      </Modal>
      <Modal
        title="Edit Category"
        visible={isEditModalOpen}
        onOk={handleEditCategory}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Category Name"
          value={editingCategory?.categoryName}
          onChange={(e) =>
            setEditingCategory({ ...editingCategory, categoryName: e.target.value })
          }
        />
      </Modal>
    </div>
  );
}

export default ListCategory;
