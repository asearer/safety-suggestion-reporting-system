import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { validationResult } from "express-validator";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async registerUser(req: Request, res: Response): Promise<Response> {
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

    async loginUser(req: Request, res: Response): Promise<Response> {
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

    async getUserProfile(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.userService.getUserProfile(req.user.id);
            return res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateUserProfile(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedUser = await this.userService.updateUserProfile(req.user.id, req.body);
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user profile:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
