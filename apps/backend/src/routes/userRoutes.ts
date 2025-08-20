import express, { Response } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService"; // Missing import
import { validateUserRegistration, validateUserLogin } from "../utils/validators";
import { authMiddleware, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();
const userController = new UserController(new UserService());

// Public routes
router.post(
    "/register",
    validateUserRegistration,
    (req: express.Request, res: Response) => userController.registerUser(req, res)
);

router.post(
    "/login",
    validateUserLogin,
    (req: express.Request, res: Response) => userController.loginUser(req, res)
);

// Protected routes
router.get(
    "/profile",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => userController.getUserProfile(req, res)
);

router.put(
    "/profile",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => userController.updateUserProfile(req, res)
);

export default router;

