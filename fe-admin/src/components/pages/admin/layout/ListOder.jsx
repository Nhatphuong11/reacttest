/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../../redux/orderSlice";
import "./ListOrder.css";
import { Button,Pagination } from "antd";
function ListOrders() {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") return <p>Loading orders...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Logic để lọc các đơn hàng theo searchTerm
  const filteredOrders = orders.filter((order) => {
    const username = order.username || ""; // Gán chuỗi rỗng nếu undefined
    const name = order.name || ""; // Gán chuỗi rỗng nếu undefined
  
    return (
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(filteredOrders.length / ordersPerPage))
      return;
    setCurrentPage(page);
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa đơn hàng này?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteOrder({ orderId }));
      alert("Xóa đơn hàng thành công!");
    } catch (error) {
      alert("Xóa đơn hàng thất bại: " + error);
    }
  };

  const handleOrderStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === "đang giao" ? "đã giao" : "đang giao";
  
    try {
      console.log("Updating status for Order ID:", orderId);
      console.log("New Status:", newStatus);
  
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap(); // Chỉnh sửa 'id' thay vì 'orderId'
      alert("Cập nhật trạng thái thành công!");
      dispatch(fetchOrders());
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Cập nhật trạng thái thất bại: " + error.message);
    }
  };
  
  
  return (
    <div className="list-orders-container">
      <h2 className="list-orders-title">Danh sách Orders</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name "
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID Order</th>
            <th>Tên người đặt</th>
            <th>Tên sản phẩm</th>
            <th>danh mục</th>
            <th>image</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.username}</td>
              <td>{order.name}</td>
              <td>{order.categoryName}</td>
              <td>
                <img
                  src={order.image}
                  style={{ width: "100px", height: "auto", objectFit: "cover" }}
                />
              </td>
              <td>{order.quantity}</td>
              <td>{order.price * order.quantity}</td>
              <td>{order.status}</td>
              <td>
                <Button style={{ marginRight: 10 }}
                  onClick={() =>
                    handleOrderStatus(
                      order.id,
                      order.status === "đang giao" ? "đang giao" : "đã giao "
                    )
                  }
                >
                  edit status
                </Button>
                <Button danger
                  onClick={() => handleDeleteOrder(order.id, order.status)} // Đảm bảo chỉ truyền order.id
                  className="delete-btn"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <Pagination
            current={currentPage}
            pageSize={ordersPerPage}
            total={filteredOrders.length}
            onChange={handlePageChange}
            className="ant-pagination"
      />
    </div>
  );
}

export default ListOrders;
