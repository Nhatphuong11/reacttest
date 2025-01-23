const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { users } = require('../mockdata');

const register = (req, res) => {
  const { username, password, email, role } = req.body;
  if (!role) return res.status(400).send('Role is required');
  
  // Kiểm tra trùng email
  const emailExists = users.find(u => u.email === email);
  if (emailExists) return res.status(400).send('Email already exists');
  
  // Mã hóa mật khẩu
  const hashedPassword = bcrypt.hashSync(password, 10); 
  const newUser = { id: users.length + 1, username, email, password: hashedPassword, role };
  users.push(newUser);  
  res.status(201).json({
    message: 'User registered successfully',
    user: newUser
  });
};


// Đăng nhập người dùng
const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", { expiresIn: "10h" });

  res.json({
    token,
    role: user.role,  
    message: "Login successful",
  });
};


module.exports = { register, login };
