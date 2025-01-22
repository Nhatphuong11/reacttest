import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "../../../services/dashboardService";
import DashboardBarChart from "../../../Bar Chart/DashboardBarChart";
import IndexReport from "../../../Bar Chart/IndexReport";
function DashboardAdmin() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getDashboardSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding:"20px" }}>
        <h2>Dashboard</h2>
        <IndexReport data={summary} />
        <DashboardBarChart data={summary} />
      </div>
    </div>
  );
}

export default DashboardAdmin;
