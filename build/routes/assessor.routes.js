"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const assessor_controller_1 = __importStar(require("../controllers/assessor.controller"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const assessor_schema_1 = require("../schemas/assessor.schema");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
router.route("/offline-batches").get(assessor_controller_1.default.getOfflineBatches);
router
    .route("/offline-batches")
    .delete(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.deleteBatches);
router
    .route("/offline-batches/:batchId")
    .get(assessor_controller_1.default.saveBatchOffline);
router.route("/offline-batches/:batchId/mark-assessor-as-reached").post(auth_middleware_1.default.isAuthenticatedAssessor, (req, res, next) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.location) {
        req.body.location = JSON.parse(req.body.location);
    }
    console.log("req body", typeof req.body);
    next();
}, (0, validateRequest_1.default)(assessor_schema_1.markAssessorAsReachedSchema), assessor_controller_1.default.markAsReached);
router
    .route("/offline-batches/:batchId/candidates")
    .get(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.candidateList);
router
    .route("/offline-batches/:batchId/reset-theory")
    .post((0, validateRequest_1.default)(assessor_schema_1.resetCandidateTheoryTestSchema), auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.resetCandidates);
router
    .route("/offline-batches/:batchId/reset-practical")
    .post((0, validateRequest_1.default)(assessor_schema_1.resetCandidateTheoryTestSchema), auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.resetCandidatesPractical);
router
    .route("/offline-batches/:batchId/reset-viva")
    .post((0, validateRequest_1.default)(assessor_schema_1.resetCandidateTheoryTestSchema), auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.resetCandidatesViva);
router
    .route("/offline-batches/:batchId/mark-theory-attendance")
    .post((0, validateRequest_1.default)(assessor_schema_1.markCandidateAttendanceSchema), auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.markAttendanceInTheory);
router
    .route("/offline-batches/:batchId/mark-practical-attendance")
    .post((0, validateRequest_1.default)(assessor_schema_1.markCandidateAttendanceSchema), auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.markAttendanceInPractical);
router
    .route("/offline-batches/:batchId/mark-viva-attendance")
    .post((0, validateRequest_1.default)(assessor_schema_1.markCandidateAttendanceSchema), auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.markAttendanceInViva);
router
    .route("/offline-batches/:batchId/start-batch")
    .post(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.startBatch);
router
    .route("/offline-batches/:batchId/practical-question-bank")
    .get(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.getPracticalQuestionBank);
router
    .route("/offline-batches/:batchId/viva-question-bank")
    .get(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.getVivaQuestionBank);
router
    .route("/offline-batches/:batchId/candidates/:candidateId/sync")
    .post(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.syncCandidate);
router
    .route("/offline-batches/:batchId/candidates/:candidateId/submit-practical")
    .post(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.submitCandidatePracticalResponses);
router
    .route("/offline-batches/:batchId/candidates/:candidateId/submit-viva")
    .post(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.submitCandidateVivaResponses);
router
    .route("/loaded-batches")
    .get(auth_middleware_1.default.isAuthenticatedAssessor, assessor_controller_1.default.getLoadedBatches);
exports.default = router;
