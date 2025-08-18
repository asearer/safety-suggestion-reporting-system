import request from "supertest";
import app from "../src/app"; // Assuming app is the Express instance
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User Routes Integration Tests", () => {
  beforeAll(async () => {
    // Clean up the database before running tests
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // Clean up the database after running tests
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST /register", () => {
    it("should register a new user and return 201", async () => {
      // Simulate a valid registration request
      const response = await request(app).post("/api/users/register").send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

      // Assert that the response status is 201 (Created)
      expect(response.status).toBe(201);
      // Assert that the response body contains the user ID
      expect(response.body).toHaveProperty("id");
      // Assert that the response body contains the correct user details
      expect(response.body.name).toBe("John Doe");
      expect(response.body.email).toBe("john@example.com");
    });

    it("should return 400 for missing fields", async () => {
      // Simulate a registration request with missing fields
      const response = await request(app).post("/api/users/register").send({
        email: "john@example.com",
      });

      // Assert that the response status is 400 (Bad Request)
      expect(response.status).toBe(400);
      // Assert that the response body contains validation errors
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("POST /login", () => {
    beforeAll(async () => {
      // Create a user for login tests
      await prisma.user.create({
        data: {
          name: "Jane Doe",
          email: "jane@example.com",
          password: "password123", // Assume password is hashed in the real implementation
        },
      });
    });

    it("should log in an existing user and return a token", async () => {
      // Simulate a valid login request
      const response = await request(app).post("/api/users/login").send({
        email: "jane@example.com",
        password: "password123",
      });

      // Assert that the response status is 200 (OK)
      expect(response.status).toBe(200);
      // Assert that the response body contains a token
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 for invalid credentials", async () => {
      // Simulate a login request with invalid credentials
      const response = await request(app).post("/api/users/login").send({
        email: "jane@example.com",
        password: "wrongpassword",
      });

      // Assert that the response status is 401 (Unauthorized)
      expect(response.status).toBe(401);
      // Assert that the response body contains an error message
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe("GET /profile", () => {
    let token: string;

    beforeAll(async () => {
      // Log in to get a valid token
      const response = await request(app).post("/api/users/login").send({
        email: "jane@example.com",
        password: "password123",
      });

      token = response.body.token;
    });

    it("should return the user profile for authenticated requests", async () => {
      // Simulate a request to fetch the user profile with a valid token
      const response = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      // Assert that the response status is 200 (OK)
      expect(response.status).toBe(200);
      // Assert that the response body contains the user ID and email
      expect(response.body).toHaveProperty("id");
      expect(response.body.email).toBe("jane@example.com");
    });

    it("should return 401 for unauthenticated requests", async () => {
      // Simulate a request to fetch the user profile without a token
      const response = await request(app).get("/api/users/profile");

      // Assert that the response status is 401 (Unauthorized)
      expect(response.status).toBe(401);
      // Assert that the response body contains an error message
      expect(response.body).toHaveProperty(
        "message",
        "Access token is missing",
      );
    });
  });
});
