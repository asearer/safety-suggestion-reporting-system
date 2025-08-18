import React, { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import apiService from "../services/apiService";

const Dashboard: React.FC = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await apiService.getReports();
                setReports(data);
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
                reports.map((report) => (
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
