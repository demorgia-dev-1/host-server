import { Request, Response, NextFunction } from "express";
import candidateService from "../services/candidate.service";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
const getMyTheoryTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const questionBank = await candidateService.getMyTheoryTest(candidateId);
    logger.log("info", "Fetched theory test for candidate", {
      layer: "candidate.controller.getMyTheoryTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json(questionBank);
  } catch (error) {
    logger.log("error", "Error fetching theory test for candidate", {
      layer: "candidate.controller.getMyTheoryTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Theory responses submitted successfully", {
      layer: "candidate.controller.submitTheoryResponses",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error submitting theory responses", {
      layer: "candidate.controller.submitTheoryResponses",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Fetched practical test for candidate", {
      layer: "candidate.controller.getPracticalTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json(test);
  } catch (error) {
    logger.log("error", "Error fetching practical test for candidate", {
      layer: "candidate.controller.getPracticalTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Theory test submitted successfully", {
      layer: "candidate.controller.submitTheoryTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error submitting theory test", {
      layer: "candidate.controller.submitTheoryTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Practical responses submitted successfully", {
      layer: "candidate.controller.submitPracticalResponses",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error submitting practical responses", {
      layer: "candidate.controller.submitPracticalResponses",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Practical test submitted successfully", {
      layer: "candidate.controller.submitPracticalTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error submitting practical test", {
      layer: "candidate.controller.submitPracticalTest",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Onboarding evidences uploaded successfully", {
      layer: "candidate.controller.uploadOnboardingEvidences",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error uploading onboarding evidences", {
      layer: "candidate.controller.uploadOnboardingEvidences",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
    logger.log("info", "Random video uploaded successfully", {
      layer: "candidate.controller.uploadRandomVideo",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error uploading random video", {
      layer: "candidate.controller.uploadRandomVideo",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
      logger.log("error", "Test type is required for photo upload", {
        layer: "candidate.controller.uploadRandomPhoto",
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
      });
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
    logger.log("info", "Random photo uploaded successfully", {
      layer: "candidate.controller.uploadRandomPhoto",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error uploading random photo", {
      layer: "candidate.controller.uploadRandomPhoto",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
    next(error);
  }
};
const batchDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.headers["x-batch-id"] as string;
    const batch = await candidateService.getBatchDetails(batchId);
    logger.log("info", "Fetched batch details", {
      layer: "candidate.controller.batchDetails",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json(batch);
  } catch (error) {
    logger.log("error", "Error fetching batch details", {
      layer: "candidate.controller.batchDetails",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
    return next(error);
  }
};
const getFeedbackForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const feedback = await candidateService.getFeedbackForm(candidateId);
    logger.log("info", "Fetched feedback form for candidate", {
      layer: "candidate.controller.getFeedbackForm",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json(feedback);
  } catch (error) {
    logger.log("error", "Error fetching feedback form for candidate", {
      layer: "candidate.controller.getFeedbackForm",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
    return next(error);
  }
};
export const submitFeedbackForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.headers["x-candidate-id"] as string;
    const batchId = req.headers["x-batch-id"] as string;
    await candidateService.submitFeedbackForm(
      candidateId,
      batchId,
      req.body.feedbacks
    );
    logger.log("info", "Feedback form submitted successfully", {
      layer: "candidate.controller.submitFeedbackForm",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      candidateId,
      batchId,
      // @ts-ignore
      requestId: req.requestId,
    });
    res.status(200).json({});
  } catch (error) {
    logger.log("error", "Error submitting feedback form", {
      layer: "candidate.controller.submitFeedbackForm",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      error: error instanceof Error ? error.message : "Unknown error",
      // @ts-ignore
      requestId: req.requestId,
    });
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
  batchDetails,
  getFeedbackForm,
  submitFeedbackForm,
};
