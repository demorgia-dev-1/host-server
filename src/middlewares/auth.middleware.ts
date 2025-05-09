import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
const isAuthenticatedCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError("Unauthorized", 401, true);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
      batchId: string;
    };
    if (!decoded || !decoded._id) {
      throw new AppError("Unauthorized", 401, true);
    }
    req.headers["x-candidate-id"] = decoded._id;
    req.headers["x-batch-id"] = decoded.batchId;
    next();
  } catch (error) {
    next(error);
  }
};
const isAuthenticatedAssessor = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const localToken = req.headers?.authorization?.split(" ")[1];
    if (!localToken) {
      throw new AppError("Unauthorized", 401, true);
    }
    const decoded = jwt.verify(localToken, process.env.JWT_SECRET!) as {
      _id: string;
    };
    if (!decoded || !decoded._id) {
      throw new AppError("Unauthorized", 401, true);
    }
    req.headers["x-assessor-id"] = decoded._id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError("Token expired", 401, true));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Invalid token", 401, true));
    }
    if (error instanceof jwt.NotBeforeError) {
      return next(new AppError("Token not active", 401, true));
    }
    next(error);
  }
};
export default { isAuthenticatedCandidate, isAuthenticatedAssessor };
