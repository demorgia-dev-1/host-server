import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware";
import candidateController from "../controllers/candidate.controller";
import validateRequest from "../middlewares/validateRequest";
import { submitTheoryResponsesSchema } from "../schemas/candidate.schema";
router
  .route("/batch-details")
  .get(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.batchDetails
  );
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
  .route("/my-practical-test")
  .get(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.getPracticalTest
  );
router
  .route("/submit-theory-responses")
  .post(
    validateRequest(submitTheoryResponsesSchema),
    authMiddleware.isAuthenticatedCandidate,
    candidateController.submitTheoryResponses
  );
router
  .route("/submit-theory-test")
  .post(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.submitTheoryTest
  );
router
  .route("/submit-practical-responses")
  .post(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.submitPracticalResponses
  );
router
  .route("/submit-practical-test")
  .post(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.submitPracticalTest
  );
router
  .route("/upload-random-video")
  .post(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.uploadRandomVideo
  );
router
  .route("/upload-random-photo")
  .post(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.uploadRandomPhoto
  );
export default router;
