import express, { Response } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
import { validateUserRegistration, validateUserLogin } from "../utils/validators";
import { authMiddleware, AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();
const userController = new UserController(new UserService());

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @access Public
 */
router.post(
    "/register",
    validateUserRegistration,
    (req: express.Request, res: Response) => userController.registerUser(req, res)
);

/**
 * @route POST /api/users/login
 * @desc Login user and return JWT token
 * @access Public
 */
router.post(
    "/login",
    validateUserLogin,
    (req: express.Request, res: Response) => userController.loginUser(req, res)
);

/**
 * @route GET /api/users/profile
 * @desc Get logged-in user's profile
 * @access Private
 */
router.get(
    "/profile",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => userController.getUserProfile(req, res)
);

/**
 * @route PUT /api/users/profile
 * @desc Update logged-in user's profile
 * @access Private
 */
router.put(
    "/profile",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response) => userController.updateUserProfile(req, res)
);

export default router;

