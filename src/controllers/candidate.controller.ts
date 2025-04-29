import { Request, Response, NextFunction } from "express";
import candidateService from "../services/candidate.service";
import { AppError } from "../utils/AppError";
const getMyTheoryTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const questionBank = await candidateService.getMyTheoryTest(candidateId);
    res.status(200).json(questionBank);
  } catch (error) {
    next(error);
  }
};
const submitTheoryResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.submitTheoryResponses(
      req.body,
      candidateId,
      batchId
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
const getPracticalTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const test = await candidateService.getMyPracticalTest(
      req.headers["x-candidate-id"] as string
    );
    res.status(200).json(test);
  } catch (error) {
    return next(error);
  }
};
const submitTheoryTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.submitTheoryTest(candidateId, batchId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
const submitPracticalResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.submitPracticalResponses(
      req.body,
      candidateId,
      batchId
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
const submitPracticalTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.submitPracticalTest(candidateId, batchId);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
const uploadOnboardingEvidences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    await candidateService.uploadOnboardingEvidence(
      candidateId,
      req?.body?.location,
      // @ts-ignore
      req?.files?.adhar,
      // @ts-ignore
      req?.files?.selfie
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
const uploadRandomVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.testType) {
      throw new AppError("Test type is required,(THEORY/PRATICAL)", 400);
    }
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.uploadRandomVideo(
      candidateId,
      // @ts-ignore
      req?.files?.video,
      batchId,
      req.body.testType
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
const uploadRandomPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body?.testType) {
      throw new AppError("Test type is required,(THEORY/PRATICAL)", 400);
    }
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.uploadRandomPhoto(
      candidateId,
      // @ts-ignore
      req?.files?.photo,
      batchId,
      req.body.testType
    );
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
export default {
  getMyTheoryTest,
  submitTheoryResponses,
  submitTheoryTest,
  submitPracticalResponses,
  submitPracticalTest,
  uploadOnboardingEvidences,
  uploadRandomVideo,
  uploadRandomPhoto,
  getPracticalTest,
};
