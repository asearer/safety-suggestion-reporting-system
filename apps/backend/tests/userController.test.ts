import { Request, Response } from "express"; // Importing types for Express request and response objects
import { UserController } from "../src/controllers/userController"; // Importing the UserController to test its methods
import { UserService } from "../src/services/userService"; // Importing the UserService to mock its behavior
import { AuthenticatedRequest } from "../src/middleware/authMiddleware";

jest.mock("../src/services/userService"); // Mocking the UserService to isolate the controller logic
jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => true),
    array: jest.fn(() => []),
  })),
}));

import { validationResult } from "express-validator";


describe("UserController", () => {
  // Grouping all tests related to the UserController
  let userController: UserController; // Instance of UserController to be tested
  let userService: jest.Mocked<UserService>; // Mocked instance of UserService
  let mockRequest: Partial<AuthenticatedRequest>; // Partial mock of AuthenticatedRequest object
  let mockResponse: Partial<Response>; // Partial mock of Express Response object
  let mockNext: jest.Mock; // Mock function for the next middleware

  beforeEach(() => {
    // Resetting mocks and initializing objects before each test
    userService = new UserService() as jest.Mocked<UserService>; // Creating a mocked instance of UserService
    userController = new UserController(userService); // Initializing UserController with the mocked service

    mockRequest = {}; // Initializing an empty mock request object
    mockResponse = {
      // Initializing a mock response object with jest functions
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn(); // Initializing a mock function for next middleware
  });

  describe("registerUser", () => {
    // Tests for the registerUser method
    it("should return 201 and the created user when registration is successful", async () => {
      // Test for successful user registration
      const mockUser = { id: 1, name: "John Doe", email: "john@example.com", createdAt: new Date(), updatedAt: new Date() }; // Mock user data
      userService.registerUser.mockResolvedValue(mockUser);

      mockRequest.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      }; // Simulating a request body with user details

      await userController.registerUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(userService.registerUser).toHaveBeenCalledWith(mockRequest.body); // Ensuring the service method is called with the correct data
      expect(mockResponse.status).toHaveBeenCalledWith(201); // Verifying the response status code is 201
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser); // Verifying the response contains the created user data
    });

    it("should return 400 when validation fails", async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => [{ msg: "Invalid input" }]),
      });

      mockRequest.body = { email: "invalid-email" };

      await userController.registerUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
    });

    it("should return 500 when an error occurs during registration", async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        isEmpty: jest.fn(() => true),
        array: jest.fn(() => []),
      });
      userService.registerUser.mockRejectedValue(
        new Error("Registration failed"),
      );

      mockRequest.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      await userController.registerUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(userService.registerUser).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("loginUser", () => {
    it("should return 200 and a token when login is successful", async () => {
      const mockToken = "mocked-jwt-token";
      userService.loginUser.mockResolvedValue(mockToken);

      mockRequest.body = { email: "john@example.com", password: "password123" };

      await userController.loginUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(userService.loginUser).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it("should return 401 when login fails", async () => {
      userService.loginUser.mockRejectedValue(new Error("Invalid credentials"));

      mockRequest.body = {
        email: "john@example.com",
        password: "wrongpassword",
      };

      await userController.loginUser(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(userService.loginUser).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });
  });

  describe("getUserProfile", () => {
    it("should return 200 and the user profile when successful", async () => {
      const mockUser = { id: 1, name: "John Doe", email: "john@example.com", createdAt: new Date(), updatedAt: new Date() };
      userService.getUserProfile.mockResolvedValue(mockUser);

      mockRequest.user = { id: 1 };

      await userController.getUserProfile(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(userService.getUserProfile).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });

    it("should return 500 when an error occurs while fetching the profile", async () => {
      userService.getUserProfile.mockRejectedValue(
        new Error("Profile fetch failed"),
      );

      mockRequest.user = { id: 1 };

      await userController.getUserProfile(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(userService.getUserProfile).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("updateUserProfile", () => {
    it("should return 200 and the updated user profile when successful", async () => {
      const mockUpdatedUser = {
        id: 1,
        name: "John Updated",
        email: "john.updated@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userService.updateUserProfile.mockResolvedValue(mockUpdatedUser);

      mockRequest.user = { id: 1 };
      mockRequest.body = {
        name: "John Updated",
        email: "john.updated@example.com",
      };

      await userController.updateUserProfile(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(userService.updateUserProfile).toHaveBeenCalledWith(
        1,
        mockRequest.body,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it("should return 500 when an error occurs while updating the profile", async () => {
      userService.updateUserProfile.mockRejectedValue(
        new Error("Profile update failed"),
      );

      mockRequest.user = { id: 1 };
      mockRequest.body = {
        name: "John Updated",
        email: "john.updated@example.com",
      };

      await userController.updateUserProfile(
        mockRequest as AuthenticatedRequest,
        mockResponse as Response,
      );

      expect(userService.updateUserProfile).toHaveBeenCalledWith(
        1,
        mockRequest.body,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
