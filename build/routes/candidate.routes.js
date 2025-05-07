"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const candidate_controller_1 = __importDefault(require("../controllers/candidate.controller"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const candidate_schema_1 = require("../schemas/candidate.schema");
router
    .route("/batch-details")
    .get(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.batchDetails);
router
    .route("/upload-onboarding-evidences")
    .post(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.uploadOnboardingEvidences);
router
    .route("/my-theory-test")
    .get(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.getMyTheoryTest);
router
    .route("/my-practical-test")
    .get(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.getPracticalTest);
router
    .route("/submit-theory-responses")
    .post((0, validateRequest_1.default)(candidate_schema_1.submitTheoryResponsesSchema), auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.submitTheoryResponses);
router
    .route("/submit-theory-test")
    .post(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.submitTheoryTest);
router
    .route("/submit-practical-responses")
    .post(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.submitPracticalResponses);
router
    .route("/submit-practical-test")
    .post(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.submitPracticalTest);
router
    .route("/upload-random-video")
    .post(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.uploadRandomVideo);
router
    .route("/upload-random-photo")
    .post(auth_middleware_1.default.isAuthenticatedCandidate, candidate_controller_1.default.uploadRandomPhoto);
exports.default = router;
