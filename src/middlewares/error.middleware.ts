import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  if (
    err instanceof JsonWebTokenError ||
    err instanceof TokenExpiredError ||
    err instanceof NotBeforeError
  ) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
  res.status(500).json({ error: "Something went wrong" });
};
