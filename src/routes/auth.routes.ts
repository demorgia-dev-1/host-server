import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { loginAssessorSchema } from "../schemas/assessor.schema";
import { loginCandidateSchema } from "../schemas/candidate.schema";
import authController from "../controllers/auth.controller";
const router = express.Router();
router
  .route("/assessor-login")
  .post(validateRequest(loginAssessorSchema), authController.loginAssessor);
router
  .route("/candidate-login")
  .post(validateRequest(loginCandidateSchema), authController.loginCandidate);
export default router;
