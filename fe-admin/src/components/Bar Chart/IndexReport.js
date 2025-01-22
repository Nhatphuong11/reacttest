import React from "react";
import "./IndexReport.css";

const IndexReport = ({ data }) => {
  const reports = [
    { label: "Total Users", value: data.totalUsers, color: "#4CAF50" },
    { label: "Total Admins", value: data.totalAdmins, color: "#2196F3" },
    { label: "Total Products", value: data.totalProducts, color: "#FFC107" },
    { label: "Total Orders", value: data.totalOrders, color: "#FF5722" },
  ];

  return (
    <div className="index-report">
      {reports.map((report, index) => (
        <div
          key={index}
          className="report-card"
          style={{ borderColor: report.color }}
        >
          <div className="report-value" style={{ color: report.color }}>
            {report.value}
          </div>
          <div className="report-label">{report.label}</div>
        </div>
      ))}
    </div>
  );
};

export default IndexReport;
