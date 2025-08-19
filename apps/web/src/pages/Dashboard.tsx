// @ts-ignore
import React, { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import apiService from "../services/apiService";

type ReportStatus = "pending" | "in_review" | "resolved";

interface Report {
  id: number;
  title: string;
  description: string;
  location: string;
  status: ReportStatus;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await apiService.getReports();
        setReports(Array.isArray(data) ? (data as Report[]) : []);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <h1>Safety Reports</h1>
      {reports.length > 0 ? (
        reports.map((report: Report) => (
          <ReportCard
            key={report.id}
            title={report.title}
            description={report.description}
            location={report.location}
            status={report.status}
            createdAt={report.createdAt}
          />
        ))
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
};

export default Dashboard;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportForm from "./pages/ReportForm";
import "./index.css";
// import demoAuthRouter from "./routes/demoAuth";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-form" element={<ReportForm />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
