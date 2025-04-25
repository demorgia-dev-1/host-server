import { Request, Response, NextFunction } from "express";
import candidateService from "../services/candidate.service";
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
export default {
  getMyTheoryTest,
  submitTheoryResponses,
  uploadOnboardingEvidences,
};
