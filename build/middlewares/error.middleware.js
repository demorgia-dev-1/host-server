"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: "Validation error",
            issues: err.errors.map((issue) => ({
                path: issue.path,
                message: issue.message,
            })),
        });
        return;
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError ||
        err instanceof jsonwebtoken_1.TokenExpiredError ||
        err instanceof jsonwebtoken_1.NotBeforeError) {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
    res.status(500).json({ error: "Something went wrong" });
};
exports.errorHandler = errorHandler;
