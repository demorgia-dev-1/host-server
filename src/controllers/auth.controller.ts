import { Request, Response, NextFunction } from "express";
import { LoginAssessor } from "../schemas/assessor.schema";
import { loginAssessor as loginAsAssessor } from "../services/auth.service";
export const loginAssessor = async (
  req: Request<{}, {}, LoginAssessor>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await loginAsAssessor(req.body);
    res.status(200).json({
      token,
    });
    return;
  } catch (error) {
    return next(error);
  }
};

export const loginCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await loginAsAssessor(req.body);
    res.status(200).json({
      token,
    });
    return;
  } catch (error) {
    console.log("controller error", error);
    return next(error);
  }
};
