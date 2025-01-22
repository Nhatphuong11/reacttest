const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Lấy token từ header Authorization

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "secret_key"); // Kiểm tra tính hợp lệ của token
    req.user = decoded; // Gắn thông tin người dùng vào req.user
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
const verifyAdmin = (req, res, next) => {
  const userRole = req.user?.role;

  if (userRole !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
};

module.exports = { verifyToken,verifyAdmin };
