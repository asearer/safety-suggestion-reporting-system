import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a consistent payload containing the user id, plus standard JWT fields
export type JwtPayload = jwt.JwtPayload & { id: number };

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

/**
 * Client placeholder for server middleware.
 */
export const authMiddleware = (..._args: unknown[]) => undefined;

