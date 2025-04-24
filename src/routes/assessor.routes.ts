import express from "express";
const router = express.Router();
import assessorController from "../controllers/assessor.controller";
import validateRequest from "../middlewares/validateRequest";
import { markAssessorAsReachedSchema } from "../schemas/assessor.schema";
import authMiddleware from "../middlewares/auth.middleware";
router.route("/offline-batches").get(assessorController.getOfflineBatches);
router
  .route("/offline-batches/:batchId")
  .get(assessorController.saveBatchOffline);
router.route("/offline-batches/:batchId/mark-assessor-as-reached").post(
  authMiddleware.isAuthenticatedAssessor,
  (req, res, next) => {
    if (req?.body?.location) {
      req.body.location = JSON.parse(req.body.location);
    }
    console.log("req body", typeof req.body);
    next();
  },
  validateRequest(markAssessorAsReachedSchema),
  assessorController.markAsReached
);
router
  .route("/offline-batches/:batchId/candidates")
  .get(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.candidateList
  );
router
  .route("/offline-batches/:batchId/reset-candidates")
  .post(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.resetCandidates
  );
router
  .route("/offline-batches/:batchId/mark-theory-attendance")
  .post(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.markAttendanceInTheory
  );
router
  .route("/offline-batches/:batchId/start-batch")
  .post(authMiddleware.isAuthenticatedAssessor, assessorController.startBatch);
router
  .route("/loaded-batches")
  .get(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.getLoadedBatches
  );
export default router;
