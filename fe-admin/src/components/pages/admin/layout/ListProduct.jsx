import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  editProduct,
} from "../../../redux/productSlice";
import { Button, Modal, Input, Pagination, Select } from "antd";
import "./ListProduct.css";

function ListProduct() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
    categoryid: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleAddProduct = async () => {
    const { name, image, price, categoryid } = newProduct;
    if (!name || !image || !price || !categoryid) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await dispatch(addProduct(newProduct));
      setNewProduct({ name: "", image: "", price: "", categoryid: "" });
      dispatch(fetchProducts());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleEditProduct = async () => {
    const { name, image, price, categoryid } = editingProduct;
    if (!name || !image || !price || !categoryid) {
      alert("Please fill in all fields");
      return;
    } 
    
    try {
      const updatedProduct = { name, image, price, categoryid };
      await dispatch(editProduct({ id: editingProduct.id, updatedProduct}));
      setIsEditModalOpen(false);
      setEditingProduct(null);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  return (
    <div className="list-product-container">
      <h2 className="list-product-title">Product List</h2>

      {/* Search bar */}
      <div className="search-bar">
        <Input
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Add Product Button */}
      <div className="add-product-btn">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <img
                    src={product.image}
                    alt="Product"
                    width="50"
                  />
                </td>
                <td>{product.price}</td>
                <td>{product.categoryName}</td>
                <td>
                  <Button
                    onClick={() => openEditModal(product)}
                    style={{ marginRight: 10 }}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={productsPerPage}
        total={filteredProducts.length}
        onChange={(page) => setCurrentPage(page)}
        className="pagination"
      />

      {/* Add Product Modal */}
      <Modal
        title="Add New Product"
        visible={isModalOpen}
        onOk={handleAddProduct}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Select
          placeholder="Select Product Category"
          value={newProduct.categoryid}
          onChange={(e) => setNewProduct({ ...newProduct, categoryid: e })}
          style={{ marginBottom: "10px", width: "100%" }}
        >
          {categories.map((category) => (
            <Select.Option
              key={category.categoryid}
              value={category.categoryid}
            >
              {category.categoryName}
            </Select.Option>
          ))}
        </Select>

        <Input
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          type="number"
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        visible={isEditModalOpen}
        onOk={handleEditProduct}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Product Name"
          value={editingProduct?.name}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, name: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Product Image URL"
          value={editingProduct?.image}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, image: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Select
          placeholder="Select Product Category"
          value={editingProduct?.categoryid || undefined}
          onChange={(value) =>
            setEditingProduct({ ...editingProduct, categoryid: value })
          }
          style={{ marginBottom: "10px", width: "100%" }}
        >
          {categories.map((category) => (
            <Select.Option
              key={category.categoryid}
              value={category.categoryid}
            >
              {category.categoryName}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder="Product Price"
          value={editingProduct?.price}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, price: e.target.value })
          }
          type="number"
        />
      </Modal>
    </div>
  );
}

export default ListProduct;
