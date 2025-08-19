import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../src/screens/Login";

// Mock the global fetch function to simulate API calls during tests
global.fetch = jest.fn();

describe("Login Screen Integration Tests", () => {
  // Clear all mock data and calls before each test to ensure isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login screen correctly", () => {
    // Render the Login screen
    const { getByPlaceholderText, getByText } = render(<Login />);

    // Verify that the email and password input fields and the login button are rendered
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("shows an error alert if email or password is missing", async () => {
    // Render the Login screen
    const { getByText } = render(<Login />);
    const loginButton = getByText("Login");

    // Simulate a press event on the login button without entering email or password
    fireEvent.press(loginButton);

    // Wait for the error alert to be displayed
    await waitFor(() => {
      expect(getByText("Error")).toBeTruthy();
      expect(getByText("Email and password are required.")).toBeTruthy();
    });
  });

  it("calls the login API and shows success alert on valid credentials", async () => {
    // Mock the API call to resolve with a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "mocked-token" }),
    });

    // Render the Login screen
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    // Simulate entering valid email and password, then pressing the login button
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    // Wait for the success alert to be displayed
    await waitFor(() => {
      expect(getByText("Success")).toBeTruthy();
      expect(getByText("Login successful!")).toBeTruthy();
    });

    // Verify that the API call was made with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/login",
      expect.any(Object),
    );
  });

  it("shows an error alert on invalid credentials", async () => {
    // Mock the API call to resolve with an unsuccessful response
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    // Render the Login screen
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const loginButton = getByText("Login");

    // Simulate entering invalid email and password, then pressing the login button
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(loginButton);

    // Wait for the error alert to be displayed
    await waitFor(() => {
      expect(getByText("Error")).toBeTruthy();
      expect(
        getByText("Login failed. Please check your credentials."),
      ).toBeTruthy();
    });

    // Verify that the API call was made with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/login",
      expect.any(Object),
    );
  });
});
