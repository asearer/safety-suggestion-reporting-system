import { Response } from "express";
import { UserService } from "../services/userService";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    /**
     * Register a new user.
     * @route POST /api/users/register
     */
    async registerUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await this.userService.registerUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
     * Authenticate user and get token.
     * @route POST /api/users/login
     */
    async loginUser(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const token = await this.userService.loginUser(req.body);
            return res.status(200).json({ token });
        } catch (error) {
            console.error("Error logging in user:", error);
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }

    /**
     * Get current user profile.
     * @route GET /api/users/profile
     */
    async getUserProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await this.userService.getUserProfile(req.user.id);
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
     * Update current user profile.
     * @route PUT /api/users/profile
     */
    async updateUserProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const updatedUser = await this.userService.updateUserProfile(req.user.id, req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user profile:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
