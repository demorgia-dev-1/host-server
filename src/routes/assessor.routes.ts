import express from "express";
const router = express.Router();
import assessorController from "../controllers/assessor.controller";
router.route("/offline-batches").get(assessorController.getOfflineBatches);
router
  .route("/offline-batches/:batchId")
  .get(assessorController.saveBatchOffline);
router.route("/loaded-batches").get(assessorController.getLoadedBatches);
export default router;
