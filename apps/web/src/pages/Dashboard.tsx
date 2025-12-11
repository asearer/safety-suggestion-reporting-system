import React, { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import MapView from "../components/MapView";
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

  // Create Report State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReport, setNewReport] = useState<{ title: string, description: string, lat: number, lng: number }>({
    title: "",
    description: "",
    lat: 40.7128, // Default New York
    lng: -74.0060
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await apiService.getReports();
      setReports(Array.isArray(data) ? (data as Report[]) : []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createReport({
        title: newReport.title,
        description: newReport.description,
        location: `${newReport.lat.toFixed(4)}, ${newReport.lng.toFixed(4)}`
      });
      setShowCreateForm(false);
      setNewReport({ title: "", description: "", lat: 40.7128, lng: -74.0060 });
      fetchReports();
    } catch (error) {
      alert("Failed to create report");
    }
  };

  if (loading && !showCreateForm) {
    return <p className="p-4">Loading reports...</p>;
  }

  return (
    <div className="dashboard container">
      <div className="flex justify-between items-center mb-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{showCreateForm ? "New Report" : "Safety Reports"}</h1>
        <button
          className={`button ${showCreateForm ? "ghost" : "primary"}`}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create Report"}
        </button>
      </div>

      {showCreateForm ? (
        <div className="grid gap-4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <form onSubmit={handleCreateSubmit} className="stack">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  className="input"
                  required
                  value={newReport.title}
                  onChange={e => setNewReport({ ...newReport, title: e.target.value })}
                  placeholder="Brief summary of the issue"
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  className="textarea"
                  required
                  rows={4}
                  value={newReport.description}
                  onChange={e => setNewReport({ ...newReport, description: e.target.value })}
                  placeholder="Detailed description..."
                />
              </div>
              <div>
                <label className="block mb-1">Location</label>
                <div className="p-2 bg-gray-100 rounded border">
                  {newReport.lat.toFixed(4)}, {newReport.lng.toFixed(4)}
                </div>
                <small className="muted">Click on map to adjust</small>
              </div>
              <button type="submit" className="button primary mt-2">Submit Report</button>
            </form>
          </div>
          <div>
            <MapView
              latitude={newReport.lat}
              longitude={newReport.lng}
              zoom={12}
              onLocationSelect={(lat, lng) => setNewReport({ ...newReport, lat, lng })}
            />
          </div>
        </div>
      ) : (
        reports.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {reports.map((report: Report) => (
              <ReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                location={report.location}
                status={report.status}
                createdAt={report.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="card p-4">
            <p>No reports available.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
