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
const AppError_1 = require("../utils/AppError");
const path_1 = __importDefault(require("path"));
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../db/schema");
const drizzle_orm_2 = require("drizzle-orm");
const uploadOnboardingEvidence = (candidateId, location, adhar, selfie) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_2.eq)(schema_1.batches.id, candidate[0].batchId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    const updatedCandidateData = {
        isEvidenceUploaded: true,
    };
    if (batch[0].isCandidateLocationRequired) {
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
    if (batch[0].isCandidateAdharRequired) {
        if (!adhar) {
            throw new AppError_1.AppError("Adhar is required", 400);
        }
        const ext = path_1.default.extname(adhar.name);
        const adharPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batch[0].id, "evidences", "candidates", candidateId, "adhar", `adhar${ext}`);
        if (!adhar.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (adhar.size > 10 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 10MB", 400);
        }
        yield adhar.mv(adharPath);
        updatedCandidateData["adharPicture"] = adharPath;
    }
    if (batch[0].isCandidateSelfieRequired) {
        if (!selfie) {
            throw new AppError_1.AppError("Selfie is required", 400);
        }
        const ext = path_1.default.extname(selfie.name);
        const selfiePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batch[0].id, "evidences", "candidates", candidateId, "selfie", `selfie${ext}`);
        if (!selfie.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (selfie.size > 10 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 10MB", 400);
        }
        yield selfie.mv(selfiePath);
        updatedCandidateData["candidateSelfie"] = selfiePath;
        updatedCandidateData["candidateSelfieTakenAt"] = new Date().toISOString();
    }
    yield db_1.default
        .update(schema_1.candidates)
        .set(updatedCandidateData)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
});
const getMyTheoryTest = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isEvidenceUploaded) {
        throw new AppError_1.AppError("Your evidence is not uploaded", 401, true);
    }
    if (candidate[0].theoryExamStatus !== "notStarted") {
        const msg = candidate[0].theoryExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is already started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_2.eq)(schema_1.batches.id, candidate[0].batchId));
    const questionBank = batch[0].theoryQuestionBank
        ? JSON.parse(batch[0].theoryQuestionBank)
        : null;
    if (!questionBank) {
        throw new AppError_1.AppError("Question bank not found", 404);
    }
    yield db_1.default
        .update(schema_1.candidates)
        .set({
        theoryExamStatus: "started",
        theoryStartedAt: new Date().toISOString(),
    })
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
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
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isPresentInPractical) {
        throw new AppError_1.AppError("your attendance is not marked in practical exam", 401, true);
    }
    if (candidate[0].practicalExamStatus !== "notStarted") {
        const msg = candidate[0].practicalExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is already started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_2.eq)(schema_1.batches.id, candidate[0].batchId));
    const questionBank = batch[0].practicalQuestionBank
        ? JSON.parse(batch[0].practicalQuestionBank)
        : null;
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
    yield db_1.default
        .update(schema_1.candidates)
        .set({
        practicalExamStatus: "started",
        practicalStartedAt: new Date().toISOString(),
    })
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    return questionBank;
});
const submitTheoryResponses = (responses, candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate || candidate.length === 0) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    const candidateData = candidate[0];
    if (!candidateData.isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    if (candidateData.theoryExamStatus !== "started") {
        const msg = candidateData.theoryExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    if (responses.responses.length === 0) {
        throw new AppError_1.AppError("No responses found", 400);
    }
    const valuesSql = responses.responses.map((r) => (0, drizzle_orm_1.sql) `(${r.questionId}, ${r.answerId}, ${batchId}, ${candidateId}, ${r.startedAt}, ${r.endedAt}, 'THEORY')`);
    db_1.default.run((0, drizzle_orm_1.sql) `
    INSERT INTO exam_response (
      questionId, answerId, batchId, candidateId, startedAt, endedAt, type
    )
    VALUES ${drizzle_orm_1.sql.join(valuesSql, (0, drizzle_orm_1.sql) `, `)}
    ON CONFLICT(questionId, candidateId) DO UPDATE SET
      answerId = excluded.answerId,
      batchId = excluded.batchId,
      startedAt = excluded.startedAt,
      endedAt = excluded.endedAt,
      type = excluded.type;
  `);
});
const submitTheoryTest = (candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    if (candidate[0].theoryExamStatus !== "started") {
        const msg = candidate[0].theoryExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    yield db_1.default
        .update(schema_1.candidates)
        .set({
        theoryExamStatus: "submitted",
        theorySubmittedAt: new Date().toISOString(),
    })
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
});
const uploadRandomVideo = (candidateId, video, batchId, testType) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_2.eq)(schema_1.batches.id, batchId));
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isCandidateVideoRequired) {
        throw new AppError_1.AppError("Video upload is not required for this batch", 400);
    }
    if (!video) {
        throw new AppError_1.AppError("Video is required", 400);
    }
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (testType === "THEORY" && !candidate[0].isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401);
    }
    if (testType === "PRACTICAL" && !candidate[0].isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401);
    }
    if (testType === "THEORY" &&
        (candidate[0].theoryExamStatus === "notStarted" ||
            candidate[0].theoryExamStatus === "submitted")) {
        throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
    }
    if (testType === "PRACTICAL" &&
        (candidate[0].practicalExamStatus === "notStarted" ||
            candidate[0].practicalExamStatus === "submitted")) {
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
const uploadRandomPhoto = (candidateId_1, photo_1, batchId_1, testType_1, ...args_1) => __awaiter(void 0, [candidateId_1, photo_1, batchId_1, testType_1, ...args_1], void 0, function* (candidateId, photo, batchId, testType, isAssessor = false) {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_2.eq)(schema_1.batches.id, batchId));
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isCandidatePhotosRequired) {
        throw new AppError_1.AppError("Video upload is not required for this batch", 400);
    }
    if (!photo) {
        throw new AppError_1.AppError("Photo is required", 400);
    }
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (!isAssessor) {
        if (testType === "THEORY" && !candidate[0].isPresentInTheory) {
            throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401);
        }
        if (testType === "PRACTICAL" && !candidate[0].isPresentInPractical) {
            throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401);
        }
        if (testType === "THEORY" &&
            (candidate[0].theoryExamStatus === "notStarted" ||
                candidate[0].theoryExamStatus === "submitted")) {
            throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
        }
        if (testType === "PRACTICAL" &&
            (candidate[0].practicalExamStatus === "notStarted" ||
                candidate[0].practicalExamStatus === "submitted")) {
            throw new AppError_1.AppError("Your exam is not started or already submitted", 401);
        }
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
    // Fetch the candidate info
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    // Ensure the candidate exists
    if (!candidate || candidate.length === 0) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    // Ensure the candidate is marked as present in practical exam
    if (!candidate[0].isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401, true);
    }
    // Ensure the exam status is neither submitted nor not started
    if (candidate[0].practicalExamStatus === "submitted" ||
        candidate[0].practicalExamStatus === "notStarted") {
        const msg = candidate[0].practicalExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    // Ensure there are practical responses to submit
    if (!responses.responses || responses.responses.length === 0) {
        throw new AppError_1.AppError("No responses provided", 400, true);
    }
    // Prepare the SQL query values for batch insertion
    const values = responses.responses
        .map((response) => {
        return `('${response.questionId}', '${response.answerId}','${batchId}', '${candidateId}','${response.startedAt}', '${response.endedAt}', 'PRACTICAL')`;
    })
        .join(", "); // Join them into a single string for the query
    // Insert or replace the responses into the `exam_response` table
    const query = `
    INSERT OR REPLACE INTO exam_response 
    (questionId, answerId, batchId, candidateId, startedAt, endedAt, type) 
    VALUES ${values}
  `;
    // Run the query asynchronously and await its completion
    yield db_1.default.run(drizzle_orm_1.sql.raw(query));
});
const submitPracticalTest = (candidateId, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isPresentInPractical) {
        throw new AppError_1.AppError("Your attendance is not marked in practical exam", 401, true);
    }
    if (candidate[0].practicalExamStatus === "submitted" ||
        candidate[0].practicalExamStatus === "notStarted") {
        const msg = candidate[0].practicalExamStatus === "submitted"
            ? "Your exam is already submitted"
            : "Your exam is not started";
        throw new AppError_1.AppError(msg, 401, true);
    }
    yield db_1.default
        .update(schema_1.candidates)
        .set({
        practicalExamStatus: "submitted",
        practicalSubmittedAt: new Date().toISOString(),
    })
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
});
const getBatchDetails = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_2.eq)(schema_1.batches.id, batchId));
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    return batch[0];
});
const getFeedbackForm = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    if (candidate[0].theoryExamStatus !== "submitted") {
        throw new AppError_1.AppError("Your exam is not submitted", 401, true);
    }
    const form = yield db_1.default
        .select()
        .from(schema_1.candidateFeedback)
        .where((0, drizzle_orm_2.eq)(schema_1.candidateFeedback.batchId, candidate[0].batchId));
    if (form.length > 0) {
        const feedback = form[0].questions;
        if (form[0].submitted) {
            return { message: "Feedback already submitted" };
        }
        if (feedback) {
            return JSON.parse(feedback);
        }
    }
    return { message: "No feedback form found" };
});
const submitFeedbackForm = (candidateId, batchId, feedbacks) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_2.eq)(schema_1.candidates.id, candidateId));
    if (!candidate) {
        throw new AppError_1.AppError("invalid credentials", 401, true);
    }
    if (!candidate[0].isPresentInTheory) {
        throw new AppError_1.AppError("Your attendance is not marked in theory exam", 401, true);
    }
    if (candidate[0].theoryExamStatus !== "submitted") {
        throw new AppError_1.AppError("Your exam is not submitted", 401, true);
    }
    const form = yield db_1.default
        .select()
        .from(schema_1.candidateFeedback)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_2.eq)(schema_1.candidateFeedback.batchId, batchId), (0, drizzle_orm_2.eq)(schema_1.candidateFeedback.candidateId, candidateId)));
    if (form.length > 0) {
        if (form[0].submitted) {
            throw new AppError_1.AppError("Feedback already submitted", 400, true);
        }
        let questions = form[0].questions;
        if (questions) {
            const parsedQuestions = JSON.parse(questions);
            parsedQuestions.forEach((q, index) => {
                const feedback = feedbacks.find((feedback) => feedback.questionId === q._id);
                if (feedback) {
                    q.response = feedback.response;
                }
            });
            yield db_1.default
                .update(schema_1.candidateFeedback)
                .set({
                questions: JSON.stringify(parsedQuestions),
                submitted: true,
            })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_2.eq)(schema_1.candidateFeedback.batchId, batchId), (0, drizzle_orm_2.eq)(schema_1.candidateFeedback.candidateId, candidateId)));
        }
    }
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
    getFeedbackForm,
    submitFeedbackForm,
};
