import React from "react";

interface ReportCardProps {
    title: string;
    description: string;
    location: string;
    status: "pending" | "in_review" | "resolved";
    createdAt: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, location, status, createdAt }) => {
    return (
        <div className="report-card">
            <h3 className="report-title">{title}</h3>
            <p className="report-description">{description}</p>
            <p className="report-location"><strong>Location:</strong> {location}</p>
            <p className="report-status"><strong>Status:</strong> {status}</p>
            <p className="report-date"><strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default ReportCard;
