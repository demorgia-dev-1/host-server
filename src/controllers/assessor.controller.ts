import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import assessorService from "../services/assessor.service";
// will fetch the batches from main server
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
// will fetch the batches from local db
export const getLoadedBatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const assessorId = req.headers["x-assessor-id"];
    const batches = await assessorService.getLoadedBatches(
      assessorId as string
    );
    res.status(200).json(batches);
  } catch (error) {
    next(error);
  }
};
export const candidateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidates = await assessorService.getCandidateList(
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json(candidates);
  } catch (error) {
    return next(error);
  }
};
export const resetCandidates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateIds = req.body.candidates;
    await assessorService.resetCandidates(
      candidateIds,
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
export const markAttendanceInTheory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await assessorService.markAttendanceInTheory(
      req.body.candidates,
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
export const markAsReached = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await assessorService.markAssessorAsReached(
      req.params.batchId,
      req.headers["x-assessor-id"] as string,
      // @ts-ignore
      req?.files?.picture,
      req.body.location
    );
    res.status(200).json({});
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
export default {
  getOfflineBatches,
  saveBatchOffline,
  getLoadedBatches,
  markAttendanceInTheory,
  candidateList,
  resetCandidates,
  markAsReached,
};
