import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/pages/Login";

global.fetch = jest.fn();

describe("Login Page Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the login form correctly", () => {
        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(getByLabelText("Email")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
        expect(getByText("Login")).toBeInTheDocument();
    });

    it("shows an error message if email or password is missing", async () => {
        const { getByText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const loginButton = getByText("Login");
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(getByText("Email and password are required.")).toBeInTheDocument();
        });
    });

    it("calls the login API and navigates to the dashboard on success", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: "mocked-token" }),
        });

        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(getByLabelText("Password"), { target: { value: "password123" } });
        fireEvent.click(getByText("Login"));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/login", expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "test@example.com", password: "password123" }),
            }));
        });

        // Mock navigation to dashboard
        expect(localStorage.getItem("token")).toBe("mocked-token");
    });

    it("shows an error message on invalid credentials", async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(getByLabelText("Email"), { target: { value: "test@example.com" } });
        fireEvent.change(getByLabelText("Password"), { target: { value: "wrongpassword" } });
        fireEvent.click(getByText("Login"));

        await waitFor(() => {
            expect(getByText("Login failed. Please check your credentials.")).toBeInTheDocument();
        });
    });
});
