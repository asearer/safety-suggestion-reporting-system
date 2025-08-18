import express from "express";
import { UserController } from "../controllers/userController";
import { validateUserRegistration, validateUserLogin } from "../utils/validators";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const userController = new UserController();

// Public routes
router.post("/register", validateUserRegistration, (req, res) => userController.registerUser(req, res));
router.post("/login", validateUserLogin, (req, res) => userController.loginUser(req, res));

// Protected routes
router.get("/profile", authMiddleware, (req, res) => userController.getUserProfile(req, res));
router.put("/profile", authMiddleware, (req, res) => userController.updateUserProfile(req, res));

export default router;
