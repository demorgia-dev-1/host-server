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
export default { getMyTheoryTest };
