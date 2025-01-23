const { products } = require('../mockdata');  
const { cateGorys } = require('../mockdata');
const getProducts = (req, res) => {
  const product = products.map((product) => {
    const category = cateGorys.find((e) => e.categoryid === product.categoryid);
    return {
      ...product,
      categoryName: category ? category.categoryName : 'Uncategorized',  // Lấy categoryName thay vì name
    };
  });
  res.json(product);
};
const addProduct = (req, res) => {
  const { name, image, price, categoryid } = req.body;

  if (!name || !image || !price || !categoryid) {
    return res.status(400).send('Name, image, and price are required');
  }

  const newProduct = { 
    id: products.length + 1, 
    name, 
    image, 
    price,
    categoryid
  };
  
  products.push(newProduct);  // Thêm vào mock data
  res.status(201).json({
    message: 'Product added successfully',
    product: newProduct,
  });
};

// Cập nhật thông tin sản phẩm
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, image, price, categoryid } = req.body;

  const product = products.find((p) => p.id === parseInt(id));
  console.log(product);
  if (!product) return res.status(404).send('Product not found');

  // Cập nhật thông tin sản phẩm
  product.name = name || product.name;
  product.image = image || product.image;
  product.price = price || product.price;
  product.categoryid = categoryid || product.categoryid;

  res.json({
    message: 'Product updated successfully',
    product,
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) return res.status(404).send('Product not found');

  products.splice(productIndex, 1);  

  res.json({
    message: 'Product deleted successfully',
    products,
  });
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
