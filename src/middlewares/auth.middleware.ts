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
    };
    if (!decoded || !decoded._id) {
      throw new AppError("Unauthorized", 401, true);
    }
    req.headers["x-candidate-id"] = decoded._id;
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
    next(error);
  }
};
export default { isAuthenticatedCandidate, isAuthenticatedAssessor };
