const jwt = require("jsonwebtoken");
const { users } = require("../mockdata");
const getUsers = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("You are not authorized to view this data");
  }
  console.log("Users data:", users); 
  res.json(users);
};


const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  console.log("Current user:", req.user);
  if (req.user.role !== "admin") {
    return res.status(403).send("You are not authorized to update this data");
  }

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return res.status(404).send("User not found");

  // Cập nhật thông tin
  user.username = username || user.username;
  user.email = email || user.email;
  user.role = role || user.role;

  res.json({ message: "User updated successfully", user });
};
const updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).send("You are not authorized to change role");
  }

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return res.status(404).send("User not found");

  user.role = role || user.role;  
  res.json({ message: "User role updated successfully", user });
};
// Xóa người dùng
const deleteUser = (req, res) => {
  const { id } = req.params;
  if (req.user.role !== "admin") {
    return res.status(403).send("You are not authorized to delete this data");
  }

  const userIndex = users.findIndex((u) => u.id === parseInt(id));
  if (userIndex === -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);

  res.json({ message: "User deleted successfully", users }); 
};


module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  updateUserRole,
};
