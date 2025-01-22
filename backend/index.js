const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const postRoutes = require('./routes/postRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dashboardRoutes=require('./routes/dashboardRoutes');
const app = express();
const port = 2001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // Đăng ký authRoutes
app.use('/api', userRoutes);     // Đăng ký userRoutes 
app.use('/api', productRoutes);
app.use('/api', postRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
