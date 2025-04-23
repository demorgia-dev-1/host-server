import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import assessorService from "../services/assessor.service";
export const getOfflineBatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new AppError("Authorization header is missing", 401, true));
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      next(new AppError("Token is missing", 401, true));
      return;
    }
    if (typeof token !== "string") {
      next(new AppError("Token is not a string", 401, true));
      return;
    }
    const batches = await assessorService.getAssignedBatches(token);
    res.status(200).json(batches);
  } catch (error) {
    next(error);
  }
};
export const saveBatchOffline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);
    if (!authHeader) {
      next(new AppError("Authorization header is missing", 401, true));
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      next(new AppError("Token is missing", 401, true));
      return;
    }
    if (typeof token !== "string") {
      next(new AppError("Token is not a string", 401, true));
      return;
    }
    const batchId = req.params.batchId;
    await assessorService.saveBatchOffline(token, batchId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
export const getLoadedBatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batches = await assessorService.getLoadedBatches();
    res.status(200).json(batches);
  } catch (error) {
    next(error);
  }
};
export default { getOfflineBatches, saveBatchOffline, getLoadedBatches };
