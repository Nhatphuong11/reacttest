import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các module cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardBarChart = ({ data }) => {
  const chartData = {
    
    labels: ["Users", "Admins", "Products", "Orders"], // Nhãn
    datasets: [
      {
        label: "Statistics", // Tiêu đề
        data: [
          data.totalUsers,
          data.totalAdmins,
          data.totalProducts,
          data.totalOrders,
        ], // Số liệu
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ], // Màu sắc cho từng cột
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ], // Màu viền cột
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Statistics Overview",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DashboardBarChart;
