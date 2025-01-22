import axios from "axios";

const BASE_URL = "http://localhost:2001/api/dashboard";

// Lấy thông tin tổng quan
export const getDashboardSummary = async () => {
  const response = await axios.get(`${BASE_URL}/summary`);
  return response.data;
};

// Lấy thống kê sản phẩm
export const getProductStatistics = async () => {
  const response = await axios.get(`${BASE_URL}/product-statistics`);
  return response.data;
};

// Lấy thống kê đơn hàng
export const getOrderStatistics = async () => {
  const response = await axios.get(`${BASE_URL}/order-statistics`);
  return response.data;
};
