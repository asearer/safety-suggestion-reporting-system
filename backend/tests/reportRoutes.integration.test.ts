import request from "supertest";
import app from "../src/app"; // Importing the Express app instance
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Report Routes Integration Tests", () => {
  let token: string;

  beforeAll(async () => {
    // Create a test user and obtain a token for authentication
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123", // Assume password is hashed in middleware
      },
    });

    // Log in the test user to retrieve a valid token
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: "password123" });

    token = response.body.token;
  });

  afterAll(async () => {
    // Clean up the database after tests
    await prisma.report.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /api/reports", () => {
    it("should create a new report", async () => {
      // Test case for successfully creating a report
      const reportData = {
        title: "Test Report",
        description: "This is a test report",
        location: "Test Location",
      };

      const response = await request(app)
        .post("/api/reports")
        .set("Authorization", `Bearer ${token}`)
        .send(reportData);

      // Verify the response status and returned data
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.title).toBe(reportData.title);
      expect(response.body.description).toBe(reportData.description);
      expect(response.body.location).toBe(reportData.location);
    });

    it("should return 400 for invalid data", async () => {
      // Test case for validation failure when creating a report
      const response = await request(app)
        .post("/api/reports")
        .set("Authorization", `Bearer ${token}`)
        .send({}); // Sending an empty payload

      // Verify the response status and error structure
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe("GET /api/reports", () => {
    it("should fetch all reports for the authenticated user", async () => {
      // Test case for retrieving all reports for the logged-in user
      const response = await request(app)
        .get("/api/reports")
        .set("Authorization", `Bearer ${token}`);

      // Verify the response status and data structure
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("PUT /api/reports/:id", () => {
    it("should update an existing report", async () => {
      // Test case for successfully updating a report
      const report = await prisma.report.create({
        data: {
          title: "Old Title",
          description: "Old Description",
          location: "Old Location",
          userId: 1, // Assuming the test user has ID 1
        },
      });

      const updatedData = {
        title: "Updated Title",
        description: "Updated Description",
        location: "Updated Location",
      };

      const response = await request(app)
        .put(`/api/reports/${report.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);

      // Verify the response status and updated data
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.description).toBe(updatedData.description);
      expect(response.body.location).toBe(updatedData.location);
    });

    it("should return 404 for a non-existent report", async () => {
      // Test case for attempting to update a non-existent report
      const response = await request(app)
        .put("/api/reports/9999")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Non-existent Report",
        });

      // Verify the response status and error message
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Report not found");
    });
  });

  describe("DELETE /api/reports/:id", () => {
    it("should delete an existing report", async () => {
      // Test case for successfully deleting a report
      const report = await prisma.report.create({
        data: {
          title: "Report to Delete",
          description: "This report will be deleted",
          location: "Delete Location",
          userId: 1, // Assuming the test user has ID 1
        },
      });

      const response = await request(app)
        .delete(`/api/reports/${report.id}`)
        .set("Authorization", `Bearer ${token}`);

      // Verify the response status for successful deletion
      expect(response.status).toBe(204);
    });

    it("should return 404 for a non-existent report", async () => {
      // Test case for attempting to delete a non-existent report
      const response = await request(app)
        .delete("/api/reports/9999")
        .set("Authorization", `Bearer ${token}`);

      // Verify the response status and error message
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Report not found");
    });
  });
});
