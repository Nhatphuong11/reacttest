const { users } = require("../mockdata"); 
const { cateGorys } = require("../mockdata");
const getAllOrders = (req, res) => {
  const allOrders = users.flatMap((user) => {
    return user.order.map((order) => {
      const category = cateGorys.find((e) => e.categoryid === order.categoryid);
      return {
        userId: user.id,
        username: user.username,
        ...order,
        categoryName: category ? category.categoryName : 'Uncategorized', 
      };
    });
  });

  res.status(200).json(allOrders);
};


// Thêm đơn hàng mới
const addOrder = (req, res) => {
  const userId = req.user.id;
  const { name, price, quantity, image, category } = req.body;
  if (!name || !price || !quantity || !image || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newOrder = {
    id: user.order.length + 1,
    name,
    price,
    quantity,
    image,
    category,
  };

  user.order.push(newOrder);
 
  res.status(201).json(newOrder);
  
};
const updateOrderStatus = (req, res) => {
  const { id } = req.params; 
  const { status } = req.body; 
  const user = users.find((user) =>
    user.order.some((order) => order.id === parseInt(id))
  );

  if (!user) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Tìm và cập nhật trạng thái đơn hàng
  const order = user.order.find((order) => order.id === parseInt(id));
  order.status = status;

  res.status(200).json(order); 
};



// Xóa đơn hàng
const deleteOrder = (req, res) => {
  const userId = req.user.id;
  const orderId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const orderIndex = user.order.findIndex((order) => order.id === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  user.order.splice(orderIndex, 1);
  res.status(200).json({ message: "Order deleted" });
};

module.exports = { getAllOrders, addOrder, deleteOrder,updateOrderStatus };
