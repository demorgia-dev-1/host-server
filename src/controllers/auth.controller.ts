import { Request, Response, NextFunction } from "express";
import { LoginAssessor } from "../schemas/assessor.schema";
import authService from "../services/auth.service";
export const loginAssessor = async (
  req: Request<{}, {}, LoginAssessor>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.loginAssessor(req.body);
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
    const token = await authService.loginCandidate(req.body);
    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
    return;
  }
};



export default { loginAssessor, loginCandidate };
