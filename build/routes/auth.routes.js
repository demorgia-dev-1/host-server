"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const assessor_schema_1 = require("../schemas/assessor.schema");
const candidate_schema_1 = require("../schemas/candidate.schema");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
router
    .route("/assessor-login")
    .post((0, validateRequest_1.default)(assessor_schema_1.loginAssessorSchema), auth_controller_1.default.loginAssessor);
router
    .route("/candidate-login")
    .post((0, validateRequest_1.default)(candidate_schema_1.loginCandidateSchema), auth_controller_1.default.loginCandidate);
exports.default = router;
