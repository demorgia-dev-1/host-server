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
exports.submitFeedbackForm = void 0;
const candidate_service_1 = __importDefault(require("../services/candidate.service"));
const AppError_1 = require("../utils/AppError");
const getMyTheoryTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const questionBank = yield candidate_service_1.default.getMyTheoryTest(candidateId);
        res.status(200).json(questionBank);
    }
    catch (error) {
        next(error);
    }
});
const submitTheoryResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitTheoryResponses(req.body, candidateId, batchId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const getPracticalTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield candidate_service_1.default.getMyPracticalTest(req.headers["x-candidate-id"]);
        res.status(200).json(test);
    }
    catch (error) {
        return next(error);
    }
});
const submitTheoryTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitTheoryTest(candidateId, batchId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const submitPracticalResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitPracticalResponses(req.body, candidateId, batchId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const submitPracticalTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitPracticalTest(candidateId, batchId);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const uploadOnboardingEvidences = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const candidateId = req.headers["x-candidate-id"];
        yield candidate_service_1.default.uploadOnboardingEvidence(candidateId, (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.location, 
        // @ts-ignore
        (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.adhar, 
        // @ts-ignore
        (_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.selfie);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const uploadRandomVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.body.testType) {
            throw new AppError_1.AppError("Test type is required,(THEORY/PRATICAL)", 400);
        }
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.uploadRandomVideo(candidateId, 
        // @ts-ignore
        (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.video, batchId, req.body.testType);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const uploadRandomPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.testType)) {
            throw new AppError_1.AppError("Test type is required,(THEORY/PRATICAL)", 400);
        }
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.uploadRandomPhoto(candidateId, 
        // @ts-ignore
        (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.photo, batchId, req.body.testType);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
const batchDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchId = req.headers["x-batch-id"];
        const batch = yield candidate_service_1.default.getBatchDetails(batchId);
        res.status(200).json(batch);
    }
    catch (error) {
        return next(error);
    }
});
const getFeedbackForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const feedback = yield candidate_service_1.default.getFeedbackForm(candidateId);
        res.status(200).json(feedback);
    }
    catch (error) {
        return next(error);
    }
});
const submitFeedbackForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitFeedbackForm(candidateId, batchId, req.body.feedbacks);
        res.status(200).json({});
    }
    catch (error) {
        next(error);
    }
});
exports.submitFeedbackForm = submitFeedbackForm;
exports.default = {
    getMyTheoryTest,
    submitTheoryResponses,
    submitTheoryTest,
    submitPracticalResponses,
    submitPracticalTest,
    uploadOnboardingEvidences,
    uploadRandomVideo,
    uploadRandomPhoto,
    getPracticalTest,
    batchDetails,
    getFeedbackForm,
    submitFeedbackForm: exports.submitFeedbackForm,
};
