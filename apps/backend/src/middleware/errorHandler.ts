import { Request, Response, NextFunction } from "express";

// Define a typed error interface
interface HttpError extends Error {
    status?: number;
}

export const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Error:", err);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.status ?? 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        error: {
            message,
            statusCode,
        },
    });
};

