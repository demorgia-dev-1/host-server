import express from "express";
const router = express.Router();
import assessorController, {
  getCandidateListFromMainServer,
  getPmkyChecklist,
  submitCandidatePracticalResponses,
  submitCandidateVivaResponses,
  uploadPmkyChecklistFiles,
} from "../controllers/assessor.controller";
import validateRequest from "../middlewares/validateRequest";
import {
  markAssessorAsReachedSchema,
  markCandidateAttendanceSchema,
  resetCandidateTheoryTestSchema,
} from "../schemas/assessor.schema";
import authMiddleware from "../middlewares/auth.middleware";
router.route("/offline-batches").get(assessorController.getOfflineBatches);
router
  .route("/offline-batches")
  .delete(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.deleteBatches
  );
router
  .route("/offline-batches/:batchId")
  .get(assessorController.saveBatchOffline);
router
  .route("/offline-batches/:batchId/pmky-checklist")
  .get(authMiddleware.isAuthenticatedAssessor, getPmkyChecklist);
router
  .route("/offline-batches/:batchId/upload-pmky-checklist")
  .post(authMiddleware.isAuthenticatedAssessor, uploadPmkyChecklistFiles);
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
  .route("/offline-batches/:batchId/list-from-server")
  .get(authMiddleware.isAuthenticatedAssessor, getCandidateListFromMainServer);
router
  .route("/offline-batches/:batchId/reset-theory")
  .post(
    validateRequest(resetCandidateTheoryTestSchema),
    authMiddleware.isAuthenticatedAssessor,
    assessorController.resetCandidates
  );
router
  .route("/offline-batches/:batchId/reset-practical")
  .post(
    validateRequest(resetCandidateTheoryTestSchema),
    authMiddleware.isAuthenticatedAssessor,
    assessorController.resetCandidatesPractical
  );
router
  .route("/offline-batches/:batchId/reset-viva")
  .post(
    validateRequest(resetCandidateTheoryTestSchema),
    authMiddleware.isAuthenticatedAssessor,
    assessorController.resetCandidatesViva
  );
router
  .route("/offline-batches/:batchId/mark-theory-attendance")
  .post(
    validateRequest(markCandidateAttendanceSchema),
    authMiddleware.isAuthenticatedAssessor,
    assessorController.markAttendanceInTheory
  );
router
  .route("/offline-batches/:batchId/mark-practical-attendance")
  .post(
    validateRequest(markCandidateAttendanceSchema),
    authMiddleware.isAuthenticatedAssessor,
    assessorController.markAttendanceInPractical
  );
router
  .route("/offline-batches/:batchId/mark-viva-attendance")
  .post(
    validateRequest(markCandidateAttendanceSchema),
    authMiddleware.isAuthenticatedAssessor,
    assessorController.markAttendanceInViva
  );
router
  .route("/offline-batches/:batchId/start-batch")
  .post(authMiddleware.isAuthenticatedAssessor, assessorController.startBatch);
router
  .route("/offline-batches/:batchId/practical-question-bank")
  .get(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.getPracticalQuestionBank
  );
router
  .route("/offline-batches/:batchId/viva-question-bank")
  .get(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.getVivaQuestionBank
  );
router
  .route("/offline-batches/:batchId/candidates/:candidateId/sync")
  .post(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.syncCandidate
  );
router
  .route("/offline-batches/:batchId/candidates/:candidateId/submit-practical")
  .post(
    authMiddleware.isAuthenticatedAssessor,
    submitCandidatePracticalResponses
  );
router
  .route("/offline-batches/:batchId/candidates/:candidateId/submit-viva")
  .post(authMiddleware.isAuthenticatedAssessor, submitCandidateVivaResponses);
router
  .route("/loaded-batches")
  .get(
    authMiddleware.isAuthenticatedAssessor,
    assessorController.getLoadedBatches
  );
export default router;
