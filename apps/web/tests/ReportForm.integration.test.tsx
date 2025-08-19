import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ReportForm from "../src/pages/ReportForm";
import apiService from "../src/services/apiService";

jest.mock("../src/services/apiService");

describe("ReportForm Page Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the form fields correctly", () => {
        render(<ReportForm />);

        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit Report/i)).toBeInTheDocument();
    });

    it("shows an error message if fields are empty on submission", async () => {
        render(<ReportForm />);

        const submitButton = screen.getByText(/Submit Report/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();
        });
    });

    it("submits the form successfully when all fields are filled", async () => {
        (apiService.createReport as jest.Mock).mockResolvedValue({
            id: 1,
            title: "Test Report",
            description: "Test Description",
            location: "Test Location",
        });

        render(<ReportForm />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Report" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Test Description" } });
        fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Test Location" } });

        const submitButton = screen.getByText(/Submit Report/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(apiService.createReport).toHaveBeenCalledWith({
                title: "Test Report",
                description: "Test Description",
                location: "Test Location",
            });
            expect(screen.getByText(/Report submitted successfully/i)).toBeInTheDocument();
        });
    });

    it("shows an error message if the API call fails", async () => {
        (apiService.createReport as jest.Mock).mockRejectedValue(new Error("Failed to submit report"));

        render(<ReportForm />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Report" } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Test Description" } });
        fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Test Location" } });

        const submitButton = screen.getByText(/Submit Report/i);
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(apiService.createReport).toHaveBeenCalledWith({
                title: "Test Report",
                description: "Test Description",
                location: "Test Location",
            });
            expect(screen.getByText(/Failed to submit report/i)).toBeInTheDocument();
        });
    });
});
