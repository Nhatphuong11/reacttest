const bcrypt = require("bcryptjs");

// Danh sách người dùng giả (mock users)
const users = [
  {
    id: 1,
    username: "phuong",
    password: bcrypt.hashSync("phuong@01", 10), // Mã hóa mật khẩu
    email: "phuong201101@gmail.com",
    role: "admin",
    order: [
      {
        id: 1,
        name: "Product 1",
        image:
          "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwf7529eaf/images/large/4110772dc0b85f3b8715323a3207d410.png?sw=350&sh=350&sm=fit&sfrm=png",
        price: 100,
        categoryid: 1,
        quantity: 3,
        status: "đang giao",
      },
      {
        image:
          "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        name: "RingG Diamond",
        price: "5000",
        id: 2,
        categoryid: 1,
        quantity: 2,
        status: "đang giao",
      },
    ],
  },
  {
    id: 2,
    username: "phuong2",
    password: bcrypt.hashSync("phuong@02", 10),
    email: "phuong201102@gmail.com",
    role: "user",
    order: [
      {
        image:
          "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
        name: "Double Ring",
        price: "5000",
        id: 4,
        categoryid: 1,
        quantity: 5,
        status: "đang giao",
      },
    ],
  },
  {
    id: 3,
    username: "john_doe",
    password: bcrypt.hashSync("john123", 10),
    email: "johndoe@example.com",
    role: "admin",
    order: [],
  },
  {
    id: 4,
    username: "jane_doe",
    password: bcrypt.hashSync("jane123", 10),
    email: "janedoe@example.com",
    role: "user",
    order: [],
  },
  {
    id: 5,
    username: "alice",
    password: bcrypt.hashSync("alice@123", 10),
    email: "alice@example.com",
    role: "user",
    order: [],
  },
];

const cateGorys = [
  {
    categoryid: 1,
    categoryName: "jewelry",
  },
  {
    categoryid: 2,
    categoryName: "game",
  },
];
const products = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwf7529eaf/images/large/4110772dc0b85f3b8715323a3207d410.png?sw=350&sh=350&sm=fit&sfrm=png",
    price: 100,
    categoryid: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    name: "RingG Diamond",
    price: "5000",
    id: 2,
    categoryid: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Ring Diamond",
    price: "5000",
    id: 3,
    categoryid: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    name: "Double Ring",
    price: "5000",
    id: 4,
    categoryid: 1,
  },
  {
    image:
      "https://minhtuanmobile.com/uploads/blog/wuthering-waves-cach-build-changli-toi-uu-nhat-240701102829.jpg",
    name: "changli",
    price: "5000",
    id: 5,
    categoryid: 2,
  },
];
const posts = [
  {
    id: 1,
    name: "posts 1",
    image:
      "https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwf7529eaf/images/large/4110772dc0b85f3b8715323a3207d410.png?sw=350&sh=350&sm=fit&sfrm=png",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    categoryid: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    name: "posts 2",
    id: 2,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    categoryid: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "posts 3",
    id: 3,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    categoryid: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    name: "post 4",
    price: "5000",
    id: 4,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    categoryid: 1,
  },
  {
    image:
      "https://minhtuanmobile.com/uploads/blog/wuthering-waves-cach-build-changli-toi-uu-nhat-240701102829.jpg",
    name: "changli",
    price: "5000",
    id: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.",
    categoryid: 2,
  },
];

module.exports = { users, products, posts, cateGorys };
