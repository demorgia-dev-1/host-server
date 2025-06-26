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
const logger_1 = __importDefault(require("../utils/logger"));
const getMyTheoryTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const questionBank = yield candidate_service_1.default.getMyTheoryTest(candidateId);
        logger_1.default.log("info", "Fetched theory test for candidate", {
            layer: "candidate.controller.getMyTheoryTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json(questionBank);
    }
    catch (error) {
        logger_1.default.log("error", "Error fetching theory test for candidate", {
            layer: "candidate.controller.getMyTheoryTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        next(error);
    }
});
const submitTheoryResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitTheoryResponses(req.body, candidateId, batchId);
        logger_1.default.log("info", "Theory responses submitted successfully", {
            layer: "candidate.controller.submitTheoryResponses",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error submitting theory responses", {
            layer: "candidate.controller.submitTheoryResponses",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        next(error);
    }
});
const getPracticalTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield candidate_service_1.default.getMyPracticalTest(req.headers["x-candidate-id"]);
        logger_1.default.log("info", "Fetched practical test for candidate", {
            layer: "candidate.controller.getPracticalTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json(test);
    }
    catch (error) {
        logger_1.default.log("error", "Error fetching practical test for candidate", {
            layer: "candidate.controller.getPracticalTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        return next(error);
    }
});
const submitTheoryTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitTheoryTest(candidateId, batchId);
        logger_1.default.log("info", "Theory test submitted successfully", {
            layer: "candidate.controller.submitTheoryTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error submitting theory test", {
            layer: "candidate.controller.submitTheoryTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        next(error);
    }
});
const submitPracticalResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitPracticalResponses(req.body, candidateId, batchId);
        logger_1.default.log("info", "Practical responses submitted successfully", {
            layer: "candidate.controller.submitPracticalResponses",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error submitting practical responses", {
            layer: "candidate.controller.submitPracticalResponses",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        next(error);
    }
});
const submitPracticalTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitPracticalTest(candidateId, batchId);
        logger_1.default.log("info", "Practical test submitted successfully", {
            layer: "candidate.controller.submitPracticalTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error submitting practical test", {
            layer: "candidate.controller.submitPracticalTest",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
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
        logger_1.default.log("info", "Onboarding evidences uploaded successfully", {
            layer: "candidate.controller.uploadOnboardingEvidences",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error uploading onboarding evidences", {
            layer: "candidate.controller.uploadOnboardingEvidences",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
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
        logger_1.default.log("info", "Random video uploaded successfully", {
            layer: "candidate.controller.uploadRandomVideo",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error uploading random video", {
            layer: "candidate.controller.uploadRandomVideo",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        next(error);
    }
});
const uploadRandomPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.testType)) {
            logger_1.default.log("error", "Test type is required for photo upload", {
                layer: "candidate.controller.uploadRandomPhoto",
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
            });
            throw new AppError_1.AppError("Test type is required,(THEORY/PRATICAL)", 400);
        }
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.uploadRandomPhoto(candidateId, 
        // @ts-ignore
        (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.photo, batchId, req.body.testType);
        logger_1.default.log("info", "Random photo uploaded successfully", {
            layer: "candidate.controller.uploadRandomPhoto",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error uploading random photo", {
            layer: "candidate.controller.uploadRandomPhoto",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        next(error);
    }
});
const batchDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batchId = req.headers["x-batch-id"];
        const batch = yield candidate_service_1.default.getBatchDetails(batchId);
        logger_1.default.log("info", "Fetched batch details", {
            layer: "candidate.controller.batchDetails",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json(batch);
    }
    catch (error) {
        logger_1.default.log("error", "Error fetching batch details", {
            layer: "candidate.controller.batchDetails",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        return next(error);
    }
});
const getFeedbackForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const feedback = yield candidate_service_1.default.getFeedbackForm(candidateId);
        logger_1.default.log("info", "Fetched feedback form for candidate", {
            layer: "candidate.controller.getFeedbackForm",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            // @ts-ignore
            requestId: req.requestId,
        });
        console.log("feedback", feedback);
        res.status(200).json(feedback);
    }
    catch (error) {
        logger_1.default.log("error", "Error fetching feedback form for candidate", {
            layer: "candidate.controller.getFeedbackForm",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
        return next(error);
    }
});
const submitFeedbackForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidateId = req.headers["x-candidate-id"];
        const batchId = req.headers["x-batch-id"];
        yield candidate_service_1.default.submitFeedbackForm(candidateId, batchId, req.body.feedbacks);
        logger_1.default.log("info", "Feedback form submitted successfully", {
            layer: "candidate.controller.submitFeedbackForm",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            candidateId,
            batchId,
            // @ts-ignore
            requestId: req.requestId,
        });
        res.status(200).json({});
    }
    catch (error) {
        logger_1.default.log("error", "Error submitting feedback form", {
            layer: "candidate.controller.submitFeedbackForm",
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            error: error instanceof Error ? error.message : "Unknown error",
            // @ts-ignore
            requestId: req.requestId,
        });
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
