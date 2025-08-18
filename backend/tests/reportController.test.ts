import { Request, Response } from "express"; // Importing types for Express request and response objects
import { ReportController } from "../src/controllers/reportController"; // Importing the ReportController class to test its methods
import { ReportService } from "../src/services/reportService"; // Importing the ReportService to mock its behavior during tests

jest.mock("../src/services/reportService"); // Mocking the ReportService to isolate the controller logic from service dependencies

describe("ReportController", () => {
  let reportController: ReportController; // Instance of the ReportController to be tested
  let mockReportService: jest.Mocked<ReportService>; // Mocked instance of the ReportService
  let mockRequest: Partial<Request>; // Partial mock of the Express Request object
  let mockResponse: Partial<Response>; // Partial mock of the Express Response object
  let mockNext: jest.Mock; // Mock function for the next middleware in the Express pipeline

  beforeEach(() => {
    mockReportService = new ReportService() as jest.Mocked<ReportService>; // Creating a mocked instance of the ReportService
    reportController = new ReportController(mockReportService); // Initializing the ReportController with the mocked service

    mockRequest = {}; // Initializing an empty mock request object
    mockResponse = {
      // Initializing a mock response object with mocked methods
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("createReport", () => {
    it("should create a report and return 201 status", async () => {
      // Test case for successful report creation
      const reportData = {
        title: "Test Report",
        description: "Test Description",
        location: "Test Location",
      };
      mockRequest.body = reportData; // Mocking the request body with report data
      mockRequest.user = { id: 1 }; // Mocking the authenticated user's ID

      mockReportService.createReport.mockResolvedValue({
        id: 1,
        ...reportData,
      }); // Mocking the service method to return a resolved promise with report data

      await reportController.createReport(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockReportService.createReport).toHaveBeenCalledWith(
        reportData,
        1,
      ); // Verifying that the service method was called with the correct arguments
      expect(mockResponse.status).toHaveBeenCalledWith(201); // Verifying that the response status was set to 201
      expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, ...reportData }); // Verifying that the response JSON contains the created report data
    });

    it("should return 400 if validation fails", async () => {
      // Test case for validation failure during report creation
      mockRequest.body = {}; // Mocking an empty request body to simulate validation failure
      mockRequest.user = { id: 1 };

      await reportController.createReport(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400); // Verifying that the response status was set to 400
      expect(mockResponse.json).toHaveBeenCalledWith({
        errors: expect.any(Array),
      }); // Verifying that the response contains validation errors
    });

    it("should return 500 if an error occurs", async () => {
      // Test case for internal server error during report creation
      const reportData = {
        title: "Test Report",
        description: "Test Description",
        location: "Test Location",
      };
      mockRequest.body = reportData; // Mocking the request body with valid report data
      mockRequest.user = { id: 1 }; // Mocking the authenticated user's ID

      mockReportService.createReport.mockRejectedValue(
        new Error("Database error"),
      ); // Mocking the service method to throw an error

      await reportController.createReport(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500); // Verifying that the response status was set to 500
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      }); // Verifying that the response contains an error message
    });
  });

  describe("getReports", () => {
    it("should return a list of reports", async () => {
      const reports = [
        {
          id: 1,
          title: "Report 1",
          description: "Description 1",
          location: "Location 1",
          status: "pending",
        },
        {
          id: 2,
          title: "Report 2",
          description: "Description 2",
          location: "Location 2",
          status: "resolved",
        },
      ];
      mockRequest.user = { id: 1 };

      mockReportService.getReports.mockResolvedValue(reports);

      await reportController.getReports(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockReportService.getReports).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(reports);
    });

    it("should return 500 if an error occurs", async () => {
      mockRequest.user = { id: 1 };

      mockReportService.getReports.mockRejectedValue(
        new Error("Database error"),
      );

      await reportController.getReports(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
