import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import apiService from "../src/services/apiService";

// Mock the API service to simulate API calls during tests
jest.mock("../src/services/apiService");

describe("Dashboard Page Integration Tests", () => {
  // Mock data representing reports fetched from the API
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

  // Clear all mock data and calls before each test to ensure isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    // Mock the API call to resolve with an empty array
    (apiService.getReports as jest.Mock).mockResolvedValue([]);

    // Render the Dashboard component
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Verify that the loading state is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders a list of reports after fetching", async () => {
    // Mock the API call to resolve with the mockReports data
    (apiService.getReports as jest.Mock).mockResolvedValue(mockReports);

    // Render the Dashboard component
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Wait for the reports to be displayed and verify their content
    await waitFor(() => {
      expect(screen.getByText("Test Report 1")).toBeInTheDocument();
      expect(screen.getByText("Description for report 1")).toBeInTheDocument();
      expect(screen.getByText("Location: Location 1")).toBeInTheDocument();
      expect(screen.getByText("Status: pending")).toBeInTheDocument();

      expect(screen.getByText("Test Report 2")).toBeInTheDocument();
      expect(screen.getByText("Description for report 2")).toBeInTheDocument();
      expect(screen.getByText("Location: Location 2")).toBeInTheDocument();
      expect(screen.getByText("Status: resolved")).toBeInTheDocument();
    });
  });

  it("renders a message if no reports are available", async () => {
    // Mock the API call to resolve with an empty array
    (apiService.getReports as jest.Mock).mockResolvedValue([]);

    // Render the Dashboard component
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Wait for the "No reports available" message to be displayed
    await waitFor(() => {
      expect(screen.getByText("No reports available.")).toBeInTheDocument();
    });
  });

  it("renders an error message if fetching reports fails", async () => {
    // Mock the API call to reject with an error
    (apiService.getReports as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch reports"),
    );

    // Render the Dashboard component
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    );

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText("Error loading reports")).toBeInTheDocument();
    });
  });
});
