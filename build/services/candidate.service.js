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
const client_1 = require("@prisma/client");
const AppError_1 = require("../utils/AppError");
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const uploadOnboardingEvidence = (candidateId, location, adhar, selfie) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield prisma.candidate.findFirst({
        where: { id: candidateId },
        select: { batch: true, isPresentInTheory: true },
    });
    console.log("location", location);
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    const updatedCandidateData = {
        isEvidanceUploaded: true,
    };
    if (candidate.batch.isCandidateLocationRequired) {
        if (!location) {
            throw new AppError_1.AppError("Location is required", 400);
        }
        location = JSON.parse(location);
        if (!location.long || !location.lat) {
            throw new AppError_1.AppError("Location is required", 400);
        }
        updatedCandidateData["candidateSelfieCoordinates"] = JSON.stringify({
            lat: location.lat,
            long: location.long,
        });
    }
    if (candidate.batch.isCandidateAdharRequired) {
        if (!adhar) {
            throw new AppError_1.AppError("Adhar is required", 400);
        }
        const ext = path_1.default.extname(adhar.name);
        const adharPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", candidate.batch.id, "evidences", "candidates", candidateId, "adhar", `adhar${ext}`);
        if (!adhar.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (adhar.size > 2 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 2MB", 400);
        }
        yield adhar.mv(adharPath);
        updatedCandidateData["adharPicture"] = adharPath;
    }
    if (candidate.batch.isCandidateSelfieRequired) {
        if (!selfie) {
            throw new AppError_1.AppError("Selfie is required", 400);
        }
        const ext = path_1.default.extname(selfie.name);
        const selfiePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", candidate.batch.id, "evidences", "candidates", candidateId, "selfie", `selfie${ext}`);
        if (!selfie.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (selfie.size > 2 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 2MB", 400);
        }
        yield selfie.mv(selfiePath);
        updatedCandidateData["candidateSelfie"] = selfiePath;
        updatedCandidateData["candidateSelfieTakenAt"] = new Date();
    }
    yield prisma.candidate.update({
        where: { id: candidateId },
        data: updatedCandidateData,
    });
});
const getMyTheoryTest = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
        },
        select: {
            batch: true,
            isPresentInTheory: true,
            theoryExamStatus: true,
            isEvidanceUploaded: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isEvidanceUploaded) {
        throw new AppError_1.AppError("Your evidence is not uploaded", 401, true);
    }
    if (candidate.theoryExamStatus !== "notStarted") {
        const msg = candidate.theoryExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is already started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    const questionBank = JSON.parse(candidate.batch.theoryQuestionBank);
    if (!questionBank) {
        throw new AppError_1.AppError("Question bank not found", 404);
    }
    yield prisma.candidate.update({
        where: { id: candidateId },
        data: {
            theoryExamStatus: "started",
            theoryStartedAt: new Date(),
        },
    });
    // randomize questions
    const questions = questionBank[0].questions;
    if (questions) {
        questions.forEach((question) => {
            const options = question.options;
            if (options) {
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }
            }
            question.options = options;
        });
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }
    questionBank[0].questions = questions;
    return questionBank;
});
const getMyPracticalTest = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
        },
        select: {
            batch: true,
            isPresentInPractical: true,
            practicalExamStatus: true,
            isEvidanceUploaded: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isPresentInPractical) {
        throw new AppError_1.AppError("your attendance is not marked in practical exam", 401, true);
    }
    if (candidate.practicalExamStatus !== "notStarted") {
        const msg = candidate.practicalExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is already started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    const questionBank = JSON.parse(candidate.batch.practicalQuestionBank);
    if (!questionBank) {
        throw new AppError_1.AppError("Question bank not found", 404);
    }
    // randomize questions
    const questions = (_a = questionBank[0]) === null || _a === void 0 ? void 0 : _a.questions;
    if (questions) {
        questions.forEach((question) => {
            const options = question.options;
            if (options) {
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }
            }
            question.options = options;
        });
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        questionBank[0].questions = questions;
    }
    yield prisma.candidate.update({
        where: { id: candidateId },
        data: {
            practicalExamStatus: "started",
            practicalStartedAt: new Date(),
        },
    });
    return questionBank;
});
const submitTheoryResponses = (responses, candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
            batchId: batchId,
        },
        select: {
            isPresentInTheory: true,
            theoryExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    if (candidate.theoryExamStatus !== "started") {
        const msg = candidate.theoryExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    if (responses.responses.length === 0) {
        throw new AppError_1.AppError("No responses found", 400);
    }
    const placeholders = responses.responses
        .map(() => "(?, ?, ?, ?, ?, ?, ?)")
        .join(", ");
    const values = responses.responses.flatMap((r) => [
        r.questionId,
        r.answerId,
        batchId,
        candidateId,
        r.startedAt,
        r.endedAt,
        "THEORY",
    ]);
    const query = `
  INSERT INTO exam_response
  (questionId, answerId, batchId, candidateId, startedAt, endedAt, type)
  VALUES ${placeholders}
  ON CONFLICT(questionId, candidateId) DO UPDATE SET
    answerId = excluded.answerId,
    batchId = excluded.batchId,
    startedAt = excluded.startedAt,
    endedAt = excluded.endedAt,
    type = excluded.type;
`;
    yield prisma.$executeRawUnsafe(query, ...values);
});
const submitTheoryTest = (candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
            batchId: batchId,
        },
        select: {
            isPresentInTheory: true,
            theoryExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    if (candidate.theoryExamStatus !== "started") {
        const msg = candidate.theoryExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    yield prisma.candidate.update({
        where: { id: candidateId },
        data: {
            theoryExamStatus: "submitted",
            theorySubmittedAt: new Date(),
        },
    });
});
const uploadRandomVideo = (candidateId, video, batchId, testType) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
        },
        select: {
            isCandidateVideoRequired: true,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isCandidateVideoRequired) {
        throw new AppError_1.AppError("Video upload is not required for this batch", 400);
    }
    if (!video) {
        throw new AppError_1.AppError("Video is required", 400);
    }
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
            batchId: batchId,
        },
        select: {
            isPresentInTheory: true,
            isPresentInPractical: true,
            theoryExamStatus: true,
            practicalExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (testType === "THEORY" && !candidate.isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401);
    }
    if (testType === "PRACTICAL" && !candidate.isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401);
    }
    if (testType === "THEORY" &&
        (candidate.theoryExamStatus === "notStarted" ||
            candidate.theoryExamStatus === "submitted")) {
        throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
    }
    if (testType === "PRACTICAL" &&
        (candidate.practicalExamStatus === "notStarted" ||
            candidate.practicalExamStatus === "submitted")) {
        throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
    }
    const ext = path_1.default.extname(video.name);
    const videoPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", testType, `${Date.now()}${ext}`);
    if (!video.mimetype.startsWith("video/")) {
        throw new AppError_1.AppError("Invalid file type", 400);
    }
    if (video.size > 200 * 1024 * 1024) {
        throw new AppError_1.AppError("File size exceeds 200MB", 400);
    }
    yield video.mv(videoPath);
});
const uploadRandomPhoto = (candidateId, photo, batchId, testType) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
        },
        select: {
            isCandidatePhotosRequired: true,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isCandidatePhotosRequired) {
        throw new AppError_1.AppError("Video upload is not required for this batch", 400);
    }
    if (!photo) {
        throw new AppError_1.AppError("Photo is required", 400);
    }
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
            batchId: batchId,
        },
        select: {
            isPresentInTheory: true,
            isPresentInPractical: true,
            theoryExamStatus: true,
            practicalExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (testType === "THEORY" && !candidate.isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401);
    }
    if (testType === "PRACTICAL" && !candidate.isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401);
    }
    if (testType === "THEORY" &&
        (candidate.theoryExamStatus === "notStarted" ||
            candidate.theoryExamStatus === "submitted")) {
        throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
    }
    if (testType === "PRACTICAL" &&
        (candidate.practicalExamStatus === "notStarted" ||
            candidate.practicalExamStatus === "submitted")) {
        throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
    }
    const ext = path_1.default.extname(photo.name);
    const photoPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", testType, `${Date.now()}${ext}`);
    if (!photo.mimetype.startsWith("image/")) {
        throw new AppError_1.AppError("Invalid file type", 400);
    }
    if (photo.size > 10 * 1024 * 1024) {
        throw new AppError_1.AppError("File size exceeds 10MB", 400);
    }
    yield photo.mv(photoPath);
});
const submitPracticalResponses = (responses, candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
            batchId: batchId,
        },
        select: {
            isPresentInPractical: true,
            practicalExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401, true);
    }
    if (candidate.practicalExamStatus === "submitted" ||
        candidate.practicalExamStatus === "notStarted") {
        const msg = candidate.practicalExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    // if (responses.responses.length === 0) {
    //   throw new AppError("No responses found", 400);
    // }
    const values = responses.responses.map((response) => {
        return `('${response.questionId}', '${response.answerId}','${batchId}', '${candidateId}','${response.startedAt}', '${response.endedAt}', 'PRACTICAL')`;
    });
    const query = `
    INSERT OR REPLACE INTO exam_response 
    (questionId, answerId, batchId, candidateId, startedAt, endedAt,type) 
    VALUES ${values}
  `;
    yield prisma.$executeRawUnsafe(query);
});
const submitPracticalTest = (candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield prisma.candidate.findFirst({
        where: {
            id: candidateId,
            batchId: batchId,
        },
        select: {
            isPresentInPractical: true,
            practicalExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate.isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401, true);
    }
    if (candidate.practicalExamStatus === "submitted" ||
        candidate.practicalExamStatus === "notStarted") {
        const msg = candidate.practicalExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    yield prisma.candidate.update({
        where: { id: candidateId },
        data: {
            practicalExamStatus: "submitted",
            practicalSubmittedAt: new Date(),
        },
    });
});
const getBatchDetails = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
        },
        select: {
            id: true,
            status: true,
            durationInMin: true,
            isCandidateAdharRequired: true,
            isCandidateLocationRequired: true,
            isCandidatePhotosRequired: true,
            isCandidateVideoRequired: true,
            isPracticalVisibleToCandidate: true,
            isCandidateSelfieRequired: true,
            isSuspiciousActivityDetectionRequired: true,
        },
    });
    return batch;
});
exports.default = {
    getMyTheoryTest,
    submitTheoryResponses,
    submitTheoryTest,
    uploadOnboardingEvidence,
    uploadRandomVideo,
    uploadRandomPhoto,
    submitPracticalResponses,
    submitPracticalTest,
    getMyPracticalTest,
    getBatchDetails,
};
