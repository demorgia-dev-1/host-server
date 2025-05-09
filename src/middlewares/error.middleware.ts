import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { SqliteError } from "better-sqlite3";
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";
import { ZodError } from "zod";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation error",
      issues: err.errors.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
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
  if (err instanceof SqliteError) {
    switch (err.code) {
      case "SQLITE_CONSTRAINT_PRIMARYKEY":
        res.status(400).json({ error: "Primary key constraint failed" });
        break;
      case "SQLITE_CONSTRAINT_UNIQUE":
        res.status(409).json({ error: "Duplicate entry not allowed" });
        break;
      case "SQLITE_BUSY":
        res.status(503).json({ error: "Database is busy. Try again later." });
        break;
      case "SQLITE_READONLY":
        res.status(500).json({ error: "Database is read-only" });
        break;
      case "SQLITE_CONSTRAINT_NOTNULL":
        res.status(400).json({ error: "Not null constraint failed" });
        break;
      case "SQLITE_CONSTRAINT_CHECK":
        res.status(400).json({ error: "Check constraint failed" });
        break;
      case "SQLITE_CONSTRAINT_TRIGGER":
        res.status(400).json({ error: "Trigger constraint failed" });
        break;
      case "SQLITE_CONSTRAINT_UNIQUE_VIOLATION":
        res.status(409).json({ error: "Unique constraint failed" });
        break;
      case "SQLITE_CONSTRAINT_FOREIGN_KEY":
        res.status(400).json({ error: "Foreign key constraint failed" });
        break;
      default:
        res.status(500).json({ error: "SQLite error", detail: err.message });
        break;
    }
    return;
  }
  res.status(500).json({ error: "Something went wrong" });
};
