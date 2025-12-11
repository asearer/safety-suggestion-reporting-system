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
        <div className="card elevated">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="mt-2">
                <small className="muted">Location: {location}</small>
            </div>
            <div className="mt-1">
                <small className="muted">Status: <strong>{status}</strong></small>
            </div>
            <div className="mt-1">
                <small className="muted">Created: {new Date(createdAt).toLocaleDateString()}</small>
            </div>
        </div>
    );
};

export default ReportCard;
