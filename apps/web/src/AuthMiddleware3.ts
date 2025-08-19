import { Request, Response, NextFunction } from "express";
// @ts-ignore
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
// @ts-ignore
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Remove duplicate imports and conflicting types
// import { Request, Response } from "express";

// Define a consistent payload containing the user id, plus standard JWT fields
export type JwtPayload = jwt.JwtPayload & { id: number; demo?: boolean };

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const DEMO_MODE = process.env.DEMO_MODE === "true";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Client placeholder for server middleware.
 */
export const authMiddleware3 = (..._args: unknown[]) => undefined;

// ... existing code ...
    this.userService = userService;
  }

  async registerUser(req: Request, res: Response): Promise<Response> {
// ... existing code ...
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
// ... existing code ...
  }

  async getUserProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // If this is a demo session, return a mock profile without hitting the DB
      if (req.user?.demo) {
        return res.status(200).json({
          id: 0,
          email: "demo@example.com",
          name: "Demo User",
          demo: true,
        });
      }

      const user = await this.userService.getUserProfile(userId);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUserProfile(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Block modifications for demo users (read-only)
      if (req.user?.demo) {
        return res.status(403).json({ message: "Demo accounts are read-only" });
      }

      const updatedUser = await this.userService.updateUserProfile(userId, req.body);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
