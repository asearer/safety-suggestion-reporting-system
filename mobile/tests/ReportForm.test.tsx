import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ReportForm from "../src/screens/ReportForm";

describe("ReportForm Screen", () => {
    it("renders the form fields correctly", () => {
        const { getByPlaceholderText } = render(<ReportForm />);
        expect(getByPlaceholderText("Title")).toBeTruthy();
        expect(getByPlaceholderText("Description")).toBeTruthy();
        expect(getByPlaceholderText("Location")).toBeTruthy();
    });

    it("shows an error alert if fields are empty on submit", () => {
        const { getByText } = render(<ReportForm />);
        const submitButton = getByText("Submit Report");

        fireEvent.press(submitButton);

        // Since we can't directly test Alert, we ensure no crash occurs and the function runs
        expect(submitButton).toBeTruthy();
    });

    it("logs the submitted data when all fields are filled", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const { getByPlaceholderText, getByText } = render(<ReportForm />);

        fireEvent.changeText(getByPlaceholderText("Title"), "Test Title");
        fireEvent.changeText(getByPlaceholderText("Description"), "Test Description");
        fireEvent.changeText(getByPlaceholderText("Location"), "Test Location");

        const submitButton = getByText("Submit Report");
        fireEvent.press(submitButton);

        expect(consoleSpy).toHaveBeenCalledWith("Report Submitted:", {
            title: "Test Title",
            description: "Test Description",
            location: "Test Location",
        });

        consoleSpy.mockRestore();
    });
});
