import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a consistent payload containing the user id, plus standard JWT fields
export type JwtPayload = jwt.JwtPayload & { id: number };

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("Authentication error: JWT_SECRET is not configured");
    res.status(500).json({ message: "Authentication is not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
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
export const authMiddleware2 = (..._args: unknown[]) => undefined;
