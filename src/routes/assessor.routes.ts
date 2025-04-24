import express from "express";
const router = express.Router();
import assessorController from "../controllers/assessor.controller";
import validateRequest from "../middlewares/validateRequest";
import { markAssessorAsReachedSchema } from "../schemas/assessor.schema";
router.route("/offline-batches").get(assessorController.getOfflineBatches);
router
  .route("/offline-batches/:batchId")
  .get(assessorController.saveBatchOffline);
router.route("/offline-batches/:batchId/mark-assessor-as-reached").post(
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
  .get(assessorController.candidateList);
router
  .route("/offline-batches/:batchId/reset-candidates")
  .post(assessorController.resetCandidates);
router
  .route("/offline-batches/:batchId/mark-theory-attendance")
  .post(assessorController.markAttendanceInTheory);
router.route("/loaded-batches").get(assessorController.getLoadedBatches);
export default router;
