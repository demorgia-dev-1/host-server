import { Request, Response, NextFunction } from "express";
import { LoginAssessor } from "../schemas/assessor.schema";
import authService from "../services/auth.service";
import logger from "../utils/logger";
export const loginAssessor = async (
  req: Request<{}, {}, LoginAssessor>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authService.loginAssessor(req.body);
    logger.log("info", "Assessor logged in successfully", {
      layer: "auth.controller.loginAssessor",
      body: req.body,
      // @ts-ignore
      requuestId: req.requestId,
    });
    res.status(200).json(data);
    return;
  } catch (error) {
    logger.log("error", "Error logging in assessor", {
      layer: "auth.controller.loginAssessor",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,

      error: error instanceof Error ? error.message : "Unknown error",
      body: req.body,
      //  @ts-ignore
      requuestId: req.requestId,
    });
    return next(error);
  }
};

export const loginCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await authService.loginCandidate(req.body);
    logger.log("info", "Candidate logged in successfully", {
      layer: "auth.controller.loginCandidate",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,

      body: req.body,
      // @ts-ignore
      requuestId: req.requestId,
    });
    res.status(200).json({
      ...response,
    });
  } catch (error) {
    logger.log("error", "Error logging in candidate", {
      layer: "auth.controller.loginCandidate",
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,

      error: error instanceof Error ? error.message : "Unknown error",
      body: req.body,
      // @ts-ignore
      requuestId: req.requestId,
    });
    next(error);
    return;
  }
};

export default { loginAssessor, loginCandidate };
