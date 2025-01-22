import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  // updateUser,
  deleteUser,
  updateUserRole,
} from "../../../redux/userSlice";
import { Button,Pagination } from "antd";
import "./ListCustomer.css";

function ListCustomer() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("usersname");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 
  useEffect(() => {
     dispatch(fetchUsers());
   }, [dispatch])
  if (status === "loading") return <p>Loading users...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      dispatch(fetchUsers()); // Tải lại danh sách sau khi xóa
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const handleUpdateRole = async (userId, newRole) => {
    try {
      await dispatch(updateUserRole({ userId, role: newRole }));
      dispatch(fetchUsers()); 
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSort = (field) => {
    setSortBy(field);
  };
 
  const filteredUsers = users.filter((user) =>
    (user.username || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Sắp xếp người dùng theo tên, email hoặc role
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortBy === "usersname")
      return (a.username || "").localeCompare(b.username || "");
    if (sortBy === "email") return (a.email || "").localeCompare(b.email || "");
    return (a.role || "").localeCompare(b.role || "");
  });

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(filteredUsers.length / usersPerPage))
      return;
    setCurrentPage(page);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <div className="list-customer-container">
      <h2 className="list-customer-title">User List</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <button
                  className="sort-btn"
                  onClick={() => handleSort("usersname")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  className="sort-btn"
                  onClick={() => handleSort("email")}
                >
                  Email
                </button>
              </th>
              <th>
                <button className="sort-btn" onClick={() => handleSort("role")}>
                  Role
                </button>
              </th>
              <th>
                <button className="sort-btn">active</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    style={{ marginRight: 10 }}
                    onClick={() =>
                      handleUpdateRole(
                        user.id,
                        user.role === "user" ? "admin" : "user"
                      )
                    }
                  >
                    Make {user.role === "user" ? "Admin" : "User"}
                  </Button>
                  <Button danger onClick={() => handleDelete(user.id)}>
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
  pageSize={usersPerPage}
  total={filteredUsers.length}
  onChange={handlePageChange}
  className="ant-pagination"
/>
    </div>
  );
}

export default ListCustomer;
