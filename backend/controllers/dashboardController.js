const { users, products, cateGorys } = require("../mockdata");

const getDashboardSummary = (req, res) => {
  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;
  const totalProducts = products.length;
  const totalOrders = users.reduce((sum, user) => sum + user.order.length, 0);

  res.json({
    totalUsers,
    totalAdmins,
    totalProducts,
    totalOrders,
  });
};


const getProductStatistics = (req, res) => {
  const productStats = cateGorys.map((category) => {
    const count = products.filter(
      (product) => product.categoryid === category.categoryid
    ).length;
    return {
      categoryName: category.categoryName,
      count,
    };
  });

  res.json(productStats);
};


const getOrderStatistics = (req, res) => {
  const orderStats = users.reduce((stats, user) => {
    user.order.forEach((order) => {
      const existing = stats.find(
        (stat) => stat.categoryid === order.categoryid
      );
      if (existing) {
        existing.quantity += order.quantity;
      } else {
        stats.push({
          categoryid: order.categoryid,
          quantity: order.quantity,
        });
      }
    });
    return stats;
  }, []);

  const result = orderStats.map((i) => ({
    categoryName:
      cateGorys.find((e) => e.categoryid === i.categoryid)?.categoryName ||
      "Unknown",
    quantity: i.quantity,
  }));

  res.json(result);
};

module.exports = {
  getDashboardSummary,
  getProductStatistics,
  getOrderStatistics,
};
