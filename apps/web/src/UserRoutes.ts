import express from "express";
import { UserController } from "../controllers/userController";
import { validateUserRegistration, validateUserLogin } from "../utils/validators";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserService } from "../services/userService";

/**
 * Client placeholder for server routes to prevent bundling server-only code.
 */
const noopRouter = {
  get: () => noopRouter,
  post: () => noopRouter,
  put: () => noopRouter,
  delete: () => noopRouter,
  use: () => noopRouter,
};

export default noopRouter;
