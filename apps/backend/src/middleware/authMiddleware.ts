import { RequestHandler } from "express";
import type { Request } from "express";
import jwt, { JwtPayload as JWTLibPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export type JwtPayload = TokenPayload;

export interface TokenPayload extends JWTLibPayload {
  id: number;
}

// Runtime type guard to safely narrow jwt.verify output
function isTokenPayload(value: unknown): value is TokenPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in (value as any) &&
    typeof (value as any).id === "number"
  );
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : auth?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token is missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!isTokenPayload(decoded)) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
