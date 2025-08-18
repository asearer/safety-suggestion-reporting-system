import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import Dashboard from "../src/screens/Dashboard";
import apiService from "../src/services/apiService";

jest.mock("../src/services/apiService");

describe("Dashboard Screen", () => {
    const mockReports = [
        {
            id: 1,
            title: "Test Report 1",
            description: "Description for report 1",
            location: "Location 1",
            status: "pending",
            createdAt: "2023-10-01T00:00:00.000Z",
        },
        {
            id: 2,
            title: "Test Report 2",
            description: "Description for report 2",
            location: "Location 2",
            status: "resolved",
            createdAt: "2023-10-02T00:00:00.000Z",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading state initially", () => {
        (apiService.getReports as jest.Mock).mockResolvedValue([]);
        const { getByText } = render(<Dashboard />);
        expect(getByText("Loading...")).toBeTruthy();
    });

    it("renders a list of reports after fetching", async () => {
        (apiService.getReports as jest.Mock).mockResolvedValue(mockReports);

        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText("Test Report 1")).toBeTruthy();
            expect(screen.getByText("Description for report 1")).toBeTruthy();
            expect(screen.getByText("Location: Location 1")).toBeTruthy();
            expect(screen.getByText("Status: pending")).toBeTruthy();

            expect(screen.getByText("Test Report 2")).toBeTruthy();
            expect(screen.getByText("Description for report 2")).toBeTruthy();
            expect(screen.getByText("Location: Location 2")).toBeTruthy();
            expect(screen.getByText("Status: resolved")).toBeTruthy();
        });
    });

    it("renders an error message if fetching reports fails", async () => {
        (apiService.getReports as jest.Mock).mockRejectedValue(new Error("Failed to fetch reports"));

        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText("Error loading reports")).toBeTruthy();
        });
    });

    it("renders a message if no reports are available", async () => {
        (apiService.getReports as jest.Mock).mockResolvedValue([]);

        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText("No reports available.")).toBeTruthy();
        });
    });
});
