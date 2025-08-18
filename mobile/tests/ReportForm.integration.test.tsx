import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ReportForm from "../src/screens/ReportForm";
import apiService from "../src/services/apiService";

jest.mock("../src/services/apiService");

describe("ReportForm Screen Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the form fields correctly", () => {
        const { getByPlaceholderText, getByText } = render(<ReportForm />);

        expect(getByPlaceholderText("Title")).toBeTruthy();
        expect(getByPlaceholderText("Description")).toBeTruthy();
        expect(getByPlaceholderText("Location")).toBeTruthy();
        expect(getByText("Submit Report")).toBeTruthy();
    });

    it("shows an error alert if fields are empty on submission", async () => {
        const { getByText } = render(<ReportForm />);

        const submitButton = getByText("Submit Report");
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(getByText("All fields are required.")).toBeTruthy();
        });
    });

    it("submits the form successfully when all fields are filled", async () => {
        (apiService.createReport as jest.Mock).mockResolvedValue({
            id: 1,
            title: "Test Report",
            description: "Test Description",
            location: "Test Location",
        });

        const { getByPlaceholderText, getByText } = render(<ReportForm />);

        fireEvent.changeText(getByPlaceholderText("Title"), "Test Report");
        fireEvent.changeText(getByPlaceholderText("Description"), "Test Description");
        fireEvent.changeText(getByPlaceholderText("Location"), "Test Location");

        const submitButton = getByText("Submit Report");
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(apiService.createReport).toHaveBeenCalledWith({
                title: "Test Report",
                description: "Test Description",
                location: "Test Location",
            });
            expect(getByText("Report submitted successfully.")).toBeTruthy();
        });
    });

    it("shows an error alert if the API call fails", async () => {
        (apiService.createReport as jest.Mock).mockRejectedValue(new Error("Failed to submit report"));

        const { getByPlaceholderText, getByText } = render(<ReportForm />);

        fireEvent.changeText(getByPlaceholderText("Title"), "Test Report");
        fireEvent.changeText(getByPlaceholderText("Description"), "Test Description");
        fireEvent.changeText(getByPlaceholderText("Location"), "Test Location");

        const submitButton = getByText("Submit Report");
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(apiService.createReport).toHaveBeenCalledWith({
                title: "Test Report",
                description: "Test Description",
                location: "Test Location",
            });
            expect(getByText("Failed to submit report.")).toBeTruthy();
        });
    });
});
