"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCandidate = exports.submitCandidateVivaResponses = exports.submitCandidatePracticalResponses = exports.getVivaQuestionBank = exports.getPracticalQuestionBank = exports.deleteBatches = exports.startBatch = exports.markAsReached = exports.markAttendanceInViva = exports.markAttendanceInPractical = exports.markAttendanceInTheory = exports.resetCandidatesViva = exports.resetCandidatesPractical = exports.resetCandidates = exports.candidateList = exports.getLoadedBatches = exports.saveBatchOffline = exports.getOfflineBatches = void 0;
const AppError_1 = require("../utils/AppError");
const assessor_service_1 = __importDefault(require("../services/assessor.service"));
// will fetch the batches from main server
const getOfflineBatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next(new AppError_1.AppError("Authorization header is missing", 401, true));
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            next(new AppError_1.AppError("Token is missing", 401, true));
            return;
        }
        if (typeof token !== "string") {
            next(new AppError_1.AppError("Token is not a string", 401, true));
            return;
        }
        const batches = yield assessor_service_1.default.getAssignedBatches(token);
        res.status(200).json(batches);
    }
    catch (error) {
        next(error);
    }
});
exports.getOfflineBatches = getOfflineBatches;
const saveBatchOffline = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        console.log("authHeader", authHeader);
        if (!authHeader) {
            next(new AppError_1.AppError("Authorization header is missing", 401, true));
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            next(new AppError_1.AppError("Token is missing", 401, true));
            return;
        }
        if (typeof token !== "string") {
            next(new AppError_1.AppError("Token is not a string", 401, true));
            return;
        }
        const batchId = req.params.batchId;
        yield assessor_service_1.default.saveBatchOffline(token, batchId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.saveBatchOffline = saveBatchOffline;
// will fetch the batches from local db
const getLoadedBatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assessorId = req.headers["x-assessor-id"];
        const batches = yield assessor_service_1.default.getLoadedBatches(assessorId);
        res.status(200).json(batches);
    }
    catch (error) {
        next(error);
    }
});
exports.getLoadedBatches = getLoadedBatches;
const candidateList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield assessor_service_1.default.getCandidateList(req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json(candidates);
    }
    catch (error) {
        return next(error);
    }
});
exports.candidateList = candidateList;
const resetCandidates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateIds = req.body.candidates;
        yield assessor_service_1.default.resetCandidates(candidateIds, req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.resetCandidates = resetCandidates;
const resetCandidatesPractical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateIds = req.body.candidates;
        yield assessor_service_1.default.resetCandidatesPractical(candidateIds, req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.resetCandidatesPractical = resetCandidatesPractical;
const resetCandidatesViva = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield assessor_service_1.default.resetCandidatesViva(req.body.candidates, req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json({});
    }
    catch (error) {
        return next(error);
    }
});
exports.resetCandidatesViva = resetCandidatesViva;
const markAttendanceInTheory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield assessor_service_1.default.markAttendanceInTheory(req.body.candidates, req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.markAttendanceInTheory = markAttendanceInTheory;
const markAttendanceInPractical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = req.body.candidates;
        const batchId = req.params.batchId;
        const assessorId = req.headers["x-assessor-id"];
        yield assessor_service_1.default.markAttendanceInPractical(candidates, batchId, assessorId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.markAttendanceInPractical = markAttendanceInPractical;
const markAttendanceInViva = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = req.body.candidates;
        const batchId = req.params.batchId;
        const assessorId = req.headers["x-assessor-id"];
        yield assessor_service_1.default.markAttendanceInViva(candidates, batchId, assessorId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.markAttendanceInViva = markAttendanceInViva;
const markAsReached = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield assessor_service_1.default.markAssessorAsReached(req.params.batchId, req.headers["x-assessor-id"], 
        // @ts-ignore
        (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.picture, req.body.location);
        res.status(200).json({});
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.markAsReached = markAsReached;
const startBatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchId = req.params.batchId;
        const assessorId = req.headers["x-assessor-id"];
        yield assessor_service_1.default.startBatch(batchId, assessorId);
        res.status(200).json({});
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.startBatch = startBatch;
const deleteBatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        yield assessor_service_1.default.deleteBatches(ids, req.headers["x-assessor-id"]);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBatches = deleteBatches;
const getPracticalQuestionBank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionBank = yield assessor_service_1.default.getPracticalQuestionBank(req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json(questionBank);
    }
    catch (error) {
        next(error);
    }
});
exports.getPracticalQuestionBank = getPracticalQuestionBank;
const getVivaQuestionBank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionBank = yield assessor_service_1.default.getVivaQuestionBank(req.params.batchId, req.headers["x-assessor-id"]);
        res.status(200).json(questionBank);
    }
    catch (error) {
        next(error);
    }
});
exports.getVivaQuestionBank = getVivaQuestionBank;
const submitCandidatePracticalResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const batchId = req.params.batchId;
        const candidateId = req.params.candidateId;
        const assessorId = req.headers["x-assessor-id"];
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.responses)) {
            return next(new AppError_1.AppError("responses are required", 400, true));
        }
        req.body.responses = JSON.parse(req.body.responses);
        if (!Array.isArray(req.body.responses)) {
            return next(new AppError_1.AppError("responses should be an array", 400, true));
        }
        // @ts-ignore
        const video = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.video;
        const responses = req.body.responses.map((response) => {
            if (!response.questionId || !response.marksObtained) {
                throw new AppError_1.AppError("questionId and answerId are required", 400, true);
            }
            return {
                questionId: response.questionId,
                marksObtained: response.marksObtained,
            };
        });
        yield assessor_service_1.default.submitCandidatePracticalResponses(responses, candidateId, batchId, assessorId, video);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.submitCandidatePracticalResponses = submitCandidatePracticalResponses;
const submitCandidateVivaResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const batchId = req.params.batchId;
        const candidateId = req.params.candidateId;
        const assessorId = req.headers["x-assessor-id"];
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.responses)) {
            return next(new AppError_1.AppError("responses are required", 400, true));
        }
        req.body.responses = JSON.parse(req.body.responses);
        if (!Array.isArray(req.body.responses)) {
            return next(new AppError_1.AppError("responses should be an array", 400, true));
        }
        const responses = req.body.responses.map((response) => {
            if (!response.questionId || !response.marksObtained) {
                throw new AppError_1.AppError("questionId and marksObtained are required", 400, true);
            }
            return {
                questionId: response.questionId,
                marksObtained: response.marksObtained,
            };
        });
        // @ts-ignore
        const video = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.video;
        yield assessor_service_1.default.submitCandidateVivaResponses(responses, candidateId, batchId, assessorId, video);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.submitCandidateVivaResponses = submitCandidateVivaResponses;
const syncCandidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchId = req.params.batchId;
        const candidateId = req.params.candidateId;
        if (!batchId || !candidateId) {
            return next(new AppError_1.AppError("batchId and candidateId are required", 400));
        }
        yield assessor_service_1.default.syncCandidate(batchId, candidateId, req.headers["x-server-auth-token"]);
        res.status(200).json({});
    }
    catch (error) {
        console.log("error", error);
        next(error);
    }
});
exports.syncCandidate = syncCandidate;
exports.default = {
    getOfflineBatches: exports.getOfflineBatches,
    saveBatchOffline: exports.saveBatchOffline,
    getLoadedBatches: exports.getLoadedBatches,
    markAttendanceInTheory: exports.markAttendanceInTheory,
    markAttendanceInPractical: exports.markAttendanceInPractical,
    markAttendanceInViva: exports.markAttendanceInViva,
    candidateList: exports.candidateList,
    resetCandidates: exports.resetCandidates,
    markAsReached: exports.markAsReached,
    startBatch: exports.startBatch,
    deleteBatches: exports.deleteBatches,
    submitCandidatePracticalResponses: exports.submitCandidatePracticalResponses,
    submitCandidateVivaResponses: exports.submitCandidateVivaResponses,
    resetCandidatesPractical: exports.resetCandidatesPractical,
    resetCandidatesViva: exports.resetCandidatesViva,
    syncCandidate: exports.syncCandidate,
    getPracticalQuestionBank: exports.getPracticalQuestionBank,
    getVivaQuestionBank: exports.getVivaQuestionBank,
};
