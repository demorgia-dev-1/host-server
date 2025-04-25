import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware";
import candidateController from "../controllers/candidate.controller";
import validateRequest from "../middlewares/validateRequest";
import { submitTheoryResponsesSchema } from "../schemas/candidate.schema";
router
  .route("/upload-onboarding-evidences")
  .post(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.uploadOnboardingEvidences
  );
router
  .route("/my-theory-test")
  .get(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.getMyTheoryTest
  );
router
  .route("/submit-theory-responses")
  .post(
    validateRequest(submitTheoryResponsesSchema),
    authMiddleware.isAuthenticatedCandidate,
    candidateController.submitTheoryResponses
  );
export default router;
