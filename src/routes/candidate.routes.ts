import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware";
import candidateController from "../controllers/candidate.controller";

router
  .route("/my-theory-test")
  .get(
    authMiddleware.isAuthenticatedCandidate,
    candidateController.getMyTheoryTest
  );

export default router;
