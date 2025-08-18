import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../src/screens/Login";

describe("Login Screen", () => {
    it("renders the login screen correctly", () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        expect(getByPlaceholderText("Email")).toBeTruthy();
        expect(getByPlaceholderText("Password")).toBeTruthy();
        expect(getByText("Login")).toBeTruthy();
    });

    it("shows an error alert if email or password is missing", async () => {
        const { getByText } = render(<Login />);
        const loginButton = getByText("Login");

        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(getByText("Error")).toBeTruthy();
            expect(getByText("Email and password are required.")).toBeTruthy();
        });
    });

    it("calls the login API and shows success alert on valid credentials", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "mocked-token" }),
            })
        ) as jest.Mock;

        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Password");
        const loginButton = getByText("Login");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "password123");
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(getByText("Success")).toBeTruthy();
            expect(getByText("Login successful!")).toBeTruthy();
        });

        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/login", expect.any(Object));
    });

    it("shows an error alert on invalid credentials", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        ) as jest.Mock;

        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Password");
        const loginButton = getByText("Login");

        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "wrongpassword");
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(getByText("Error")).toBeTruthy();
            expect(getByText("Login failed. Please check your credentials.")).toBeTruthy();
        });

        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/login", expect.any(Object));
    });
});
