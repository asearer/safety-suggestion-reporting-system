import React from "react";
import { render } from "@testing-library/react";
import ReportCard from "../src/components/ReportCard";

describe("ReportCard Component", () => {
    const mockReport = {
        title: "Test Report",
        description: "This is a test description.",
        location: "Test Location",
        status: "pending",
        createdAt: "2023-10-01T00:00:00.000Z",
    };

    it("renders the report title", () => {
        const { getByText } = render(<ReportCard {...mockReport} />);
        expect(getByText("Test Report")).toBeInTheDocument();
    });

    it("renders the report description", () => {
        const { getByText } = render(<ReportCard {...mockReport} />);
        expect(getByText("This is a test description.")).toBeInTheDocument();
    });

    it("renders the report location", () => {
        const { getByText } = render(<ReportCard {...mockReport} />);
        expect(getByText(/Location: Test Location/i)).toBeInTheDocument();
    });

    it("renders the report status", () => {
        const { getByText } = render(<ReportCard {...mockReport} />);
        expect(getByText(/Status: pending/i)).toBeInTheDocument();
    });

    it("renders the report creation date", () => {
        const { getByText } = render(<ReportCard {...mockReport} />);
        expect(getByText(/Created At: 10\/1\/2023/i)).toBeInTheDocument();
    });
});
