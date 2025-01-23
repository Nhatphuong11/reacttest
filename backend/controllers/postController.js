const { posts } = require('../mockdata');  
const { cateGorys } = require('../mockdata');
const getPosts = (req, res) => {
  const post = posts.map((post) => {
    const category = cateGorys.find((e) => e.categoryid === post.categoryid);
    return {
      ...post,
      categoryName: category ? category.categoryName : 'Uncategorized',  
    };
  });
  res.json(post);
};

const addPosts = (req, res) => {
  const { name, image, content, categoryid } = req.body;
  if (!name || !image || !content || !categoryid) {
    return res.status(400).send('Name, image, and content are required');
  }
  const newPosts = { 
    id: posts.length + 1, 
    name, 
    image, 
    content,
    categoryid
  };
  
  posts.push(newPosts);  

  res.status(201).json({
    message: 'Product added successfully',
    post: newPosts,
  });
};

// Cập nhật thông tin sản phẩm
const updatePosts = (req, res) => {
  const { id } = req.params;
  const { name, image, content, categoryid } = req.body;

  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return res.status(404).send('Product not found');
  post.name = name || post.name;
  post.image = image || post.image;
  post.content = content || post.content;
  post.categoryid = categoryid || post.categoryid;
  res.json({
    message: 'Product updated successfully',
    post,
  });
};

const deletePosts = (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((p) => p.id === parseInt(id));

  if (postIndex === -1) return res.status(404).send('Product not found');

  posts.splice(postIndex, 1); 

  res.json({
    message: 'Product deleted successfully',
    posts,
  });
};

module.exports = { getPosts, addPosts, updatePosts, deletePosts };
