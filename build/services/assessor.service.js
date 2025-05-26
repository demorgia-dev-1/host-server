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
// @ts-nocheck
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const AppError_1 = require("../utils/AppError");
const mime_types_1 = __importDefault(require("mime-types"));
const uuid_1 = require("uuid");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const mediaLocalizer_1 = require("../utils/mediaLocalizer");
const getAssignedBatches = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
        }
        throw new AppError_1.AppError("internal server error", 500);
    }
});
const saveBatchOffline = (token, batchId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const { batch, candidates, theoryQuestionBank, practicalQuestionBank, vivaQuestionBank, sectorLogo, pmkyChecklist, feedbackForms, } = response.data.data;
        let uploadLogoUrl = "";
        if (sectorLogo) {
            const LOCAL_SERVER_BASE_URL = "{{BASE_URL}}/static/assets";
            const LOCAL_ASSET_DIR = path_1.default.join(__dirname, "..", "..", "public/assets");
            const ext = path_1.default.extname(sectorLogo);
            const filename = (0, uuid_1.v4)() + ext;
            const localPath = path_1.default.join(LOCAL_ASSET_DIR, filename);
            if (!fs_1.default.existsSync(LOCAL_ASSET_DIR)) {
                fs_1.default.mkdirSync(LOCAL_ASSET_DIR, { recursive: true });
            }
            const response = yield axios_1.default.get(sectorLogo, {
                responseType: "arraybuffer",
            });
            fs_1.default.writeFileSync(localPath, response.data);
            uploadLogoUrl = LOCAL_SERVER_BASE_URL + "/" + filename;
        }
        if (theoryQuestionBank) {
            const questionBank = theoryQuestionBank[0];
            for (const question of questionBank.questions) {
                const options = yield Promise.all(question.options.map((option) => {
                    return (0, mediaLocalizer_1.downloadMediaAndReplaceUrls)(option.option);
                }));
                question.options.forEach((option, index) => {
                    option.option = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(option.option, options[index]);
                    if (option === null || option === void 0 ? void 0 : option.translations) {
                        for (const [key, value] of Object.entries(option.translations)) {
                            const replacement = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(option.translations[key], options[index]);
                            option.translations[key] = replacement;
                        }
                    }
                });
            }
            const localizeQuestions = yield Promise.all(questionBank.questions.map((q) => {
                return (0, mediaLocalizer_1.downloadMediaAndReplaceUrls)(q.title);
            }));
            questionBank.questions.forEach((q, index) => {
                q.title = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(q.title, localizeQuestions[index]);
                if (q.translations) {
                    for (const [key, value] of Object.entries(q === null || q === void 0 ? void 0 : q.translations)) {
                        q.translations[key] = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(q.translations[key], localizeQuestions[index]);
                    }
                }
            });
        }
        if (practicalQuestionBank) {
            const questionBank = practicalQuestionBank[0];
            for (const question of questionBank.questions) {
                const options = yield Promise.all(question.options.map((option) => {
                    return (0, mediaLocalizer_1.downloadMediaAndReplaceUrls)(option.option);
                }));
                question.options.forEach((option, index) => {
                    option.option = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(option.option, options[index]);
                    if (option === null || option === void 0 ? void 0 : option.translations) {
                        for (const [key, value] of Object.entries(option.translations)) {
                            // option.translations[key] = options[index];
                            const replacement = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(option.translations[key], options[index]);
                            option.translations[key] = replacement;
                        }
                    }
                });
            }
            const localizeQuestions = yield Promise.all(questionBank.questions.map((q) => {
                return (0, mediaLocalizer_1.downloadMediaAndReplaceUrls)(q.title);
            }));
            questionBank.questions.forEach((q, index) => {
                // q.title = localizeQuestions[index];
                q.title = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(q.title, localizeQuestions[index]);
                if (q.translations) {
                    for (const [key, value] of Object.entries(q === null || q === void 0 ? void 0 : q.translations)) {
                        // q.translations[key] = localizeQuestions[index];
                        const replacement = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(q.translations[key], localizeQuestions[index]);
                        q.translations[key] = replacement;
                    }
                }
            });
        }
        if (vivaQuestionBank) {
            const questionBank = vivaQuestionBank[0];
            for (const question of questionBank.questions) {
                const options = yield Promise.all(question.options.map((option) => {
                    return (0, mediaLocalizer_1.downloadMediaAndReplaceUrls)(option.option);
                }));
                question.options.forEach((option, index) => {
                    // option.option = options[index];
                    option.option = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(option.option, options[index]);
                    if (question.translations) {
                        for (const [key, value] of Object.entries(option === null || option === void 0 ? void 0 : option.translations)) {
                            // option.translations[key] = options[index];
                            const replacement = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(option.translations[key], options[index]);
                            option.translations[key] = replacement;
                        }
                    }
                });
            }
            const localizeQuestions = yield Promise.all(questionBank.questions.map((q) => {
                return (0, mediaLocalizer_1.downloadMediaAndReplaceUrls)(q.title);
            }));
            questionBank.questions.forEach((q, index) => {
                // q.title = localizeQuestions[index];
                q.title = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(q.title, localizeQuestions[index]);
                if (q.translations) {
                    for (const [key, value] of Object.entries(q === null || q === void 0 ? void 0 : q.translations)) {
                        // q.translations[key] = localizeQuestions[index];
                        const replacement = (0, mediaLocalizer_1.replaceMediaUrlsWithArray)(q.translations[key], localizeQuestions[index]);
                    }
                }
                // if (q.translations) {
                //   for (const [key, value] of Object.entries(q?.translations)) {
                //     q.translations[key] = localizeQuestions[index];
                //   }
                // }
            });
        }
        batch.assessorCoordinates = batch.assessorCoordinates
            ? JSON.stringify(batch.assessorCoordinates)
            : null;
        const preparedBatch = Object.assign(Object.assign({}, batch), { id: batch._id, theoryQuestionBank: JSON.stringify(theoryQuestionBank), practicalQuestionBank: JSON.stringify(practicalQuestionBank), vivaQuestionBank: JSON.stringify(vivaQuestionBank), pmkyChecklist: JSON.stringify(pmkyChecklist), sscLogo: uploadLogoUrl });
        const preparedCandidates = candidates.docs.map((candidate) => ({
            id: candidate._id,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            address: candidate.address,
            batchId: batch._id,
            fatherName: candidate.fatherName,
            enrollmentNo: candidate.enrollmentNo,
            isActive: candidate.isActive,
            password: candidate.password,
            gender: candidate.gender,
            adharNo: candidate.adharNo,
            isTheoryStarted: false,
            isEvidenceUploaded: false,
            isPresentInTheory: false,
            isPresentInPractical: false,
            isPresentInViva: false,
            isTheorySubmitted: false,
            theoryExamStatus: "notStarted",
            practicalExamStatus: "notStarted",
            vivaExamStatus: "notStarted",
            multipleFaceDetectionCount: 0,
            faceHiddenCount: 0,
            tabSwitchCount: 0,
            exitFullScreenCount: 0,
            theoryStartedAt: null,
            theorySubmittedAt: null,
            candidateSelfieCoordinates: null,
            candidateSelfieTakenAt: null,
            candidateSelfie: null,
            adharPicture: null,
            resetedAt: null,
            practicalStartedAt: null,
            practicalSubmittedAt: null,
        }));
        const preparedFeedbackForms = (feedbackForms === null || feedbackForms === void 0 ? void 0 : feedbackForms.map((form) => ({
            id: form._id,
            batchId: form.batch,
            candidateId: form.candidate,
            questions: JSON.stringify(form.questions),
            submitted: form.submitted,
        }))) || [];
        db_1.default.transaction((tx) => {
            if (preparedBatch) {
                tx.insert(schema_1.batches)
                    .values({
                    id: preparedBatch.id,
                    assessor: preparedBatch.assessor,
                    name: preparedBatch.name,
                    type: preparedBatch.type,
                    status: preparedBatch.status,
                    noOfCandidates: preparedBatch.noOfCandidates,
                    durationInMin: preparedBatch.durationInMin,
                    no: preparedBatch.no,
                    startDate: preparedBatch.startDate,
                    endDate: preparedBatch.endDate,
                    theoryQuestionBank: preparedBatch.theoryQuestionBank,
                    practicalQuestionBank: preparedBatch.practicalQuestionBank,
                    vivaQuestionBank: preparedBatch.vivaQuestionBank,
                    isAssessorReached: preparedBatch.isAssessorReached,
                    isCandidateVideoRequired: preparedBatch.isCandidateVideoRequired,
                    isCandidatePhotosRequired: preparedBatch.isCandidatePhotosRequired,
                    isCandidateLocationRequired: preparedBatch.isCandidateLocationRequired,
                    isCandidateAdharRequired: preparedBatch.isCandidateAdharRequired,
                    isCandidateSelfieRequired: preparedBatch.isCandidateSelfieRequired,
                    isPracticalVisibleToCandidate: preparedBatch.isPracticalVisibleToCandidate,
                    isSuspiciousActivityDetectionRequired: preparedBatch.isSuspiciousActivityDetectionRequired,
                    isAssessorEvidenceRequired: preparedBatch.isAssessorEvidenceRequired,
                    assessorReachedAt: preparedBatch.assessorReachedAt,
                    assessorCoordinates: preparedBatch.assessorCoordinates,
                    assessorGroupPhoto: preparedBatch.assessorGroupPhoto,
                    isPmkyCheckListRequired: preparedBatch.isPmkyCheckListRequired,
                    sscLogo: preparedBatch.sscLogo,
                    pmkyChecklist: preparedBatch.pmkyChecklist,
                })
                    .run();
            }
            if (preparedCandidates.length > 0) {
                tx.insert(schema_1.candidates).values(preparedCandidates).run();
            }
            if ((preparedFeedbackForms === null || preparedFeedbackForms === void 0 ? void 0 : preparedFeedbackForms.length) > 0) {
                tx.insert(schema_1.candidateFeedback).values(preparedFeedbackForms).run();
            }
            return;
        });
    }
    catch (error) {
        console.error("Error saving batch offline:", error);
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
        }
        throw error;
    }
});
const getLoadedBatches = (assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batches = yield db_1.default
            .select()
            .from(schema_1.batches)
            .where((0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId));
        return batches;
    }
    catch (error) {
        throw new AppError_1.AppError("internal server error", 500);
    }
});
const getCandidateList = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const candidates = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId));
    return candidates;
});
const getCandidateListFromMainServer = (batchId, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/batches/${batchId}/candidates`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
        }
        throw new AppError_1.AppError("internal server error", 500);
    }
});
const markAttendanceInTheory = (candidates, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch = yield db_1.default
            .select()
            .from(schema_1.batches)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
            .limit(1);
        if (!batch) {
            throw new AppError_1.AppError("Batch not found", 404);
        }
        if (!batch[0].theoryQuestionBank) {
            throw new AppError_1.AppError("no theory question bank found", 400);
        }
        if (batch[0].status === "assigned") {
            throw new AppError_1.AppError("Batch is not started yet", 400);
        }
        if (batch[0].status === "completed") {
            throw new AppError_1.AppError("Batch is already completed", 400);
        }
        if (!batch[0].isAssessorReached) {
            throw new AppError_1.AppError("mark yourself as reached", 400);
        }
        const updatedCandidates = yield db_1.default
            .update(schema_1.candidates)
            .set({ isPresentInTheory: true })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId), (0, drizzle_orm_1.or)(...candidates.map((id) => (0, drizzle_orm_1.eq)(schema_1.candidates.id, id)))));
        return updatedCandidates;
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            throw error;
        }
        throw new AppError_1.AppError("internal server error", 500);
    }
});
const markAttendanceInPractical = (candidates, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].practicalQuestionBank) {
        throw new AppError_1.AppError("no practical question bank found", 400);
    }
    if (batch[0].status === "assigned") {
        throw new AppError_1.AppError("Batch is not started yet", 400);
    }
    if (batch[0].status === "completed") {
        throw new AppError_1.AppError("Batch is already completed", 400);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const updatedCandidates = yield db_1.default
        .update(schema_1.candidates)
        .set({ isPresentInPractical: true })
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId), (0, drizzle_orm_1.or)(...candidates.map((id) => (0, drizzle_orm_1.eq)(schema_1.candidates.id, id)))));
    return updatedCandidates;
});
const markAttendanceInViva = (candidates, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].vivaQuestionBank) {
        throw new AppError_1.AppError("no viva question bank found", 400);
    }
    if (batch[0].status === "assigned") {
        throw new AppError_1.AppError("Batch is not started yet", 400);
    }
    if (batch[0].status === "completed") {
        throw new AppError_1.AppError("Batch is already completed", 400);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const updatedCandidates = yield db_1.default
        .update(schema_1.candidates)
        .set({ isPresentInViva: true })
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId), (0, drizzle_orm_1.or)(...candidates.map((id) => (0, drizzle_orm_1.eq)(schema_1.candidates.id, id)))));
    return updatedCandidates;
});
const resetCandidates = (candidateIds, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    if (batch[0].status !== "ongoing") {
        throw new AppError_1.AppError("Batch is not ongoing", 400);
    }
    const examFolders = [
        ["photos", "THEORY"],
        ["videos", "THEORY"],
        ["videos", "PRACTICAL"],
        ["videos", "VIVA"],
        ["adhar"],
        ["selfie"],
    ];
    const deletePaths = candidateIds.flatMap((candidateId) => {
        const basePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId);
        return examFolders.map((addOn) => path_1.default.join(basePath, ...addOn));
    });
    db_1.default.transaction((tx) => {
        tx.update(schema_1.candidates)
            .set({
            isPresentInTheory: false,
            isPresentInPractical: false,
            isPresentInViva: false,
            isTheorySubmitted: false,
            theoryExamStatus: "notStarted",
            practicalExamStatus: "notStarted",
            vivaExamStatus: "notStarted",
            multipleFaceDetectionCount: 0,
            isEvidenceUploaded: false,
            faceHiddenCount: 0,
            tabSwitchCount: 0,
            exitFullScreenCount: 0,
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId), (0, drizzle_orm_1.inArray)(schema_1.candidates.id, candidateIds)))
            .run();
        tx.delete(schema_1.examResponses)
            .where((0, drizzle_orm_1.inArray)(schema_1.examResponses.candidateId, candidateIds))
            .run();
    });
    yield Promise.all(deletePaths.map((targetPath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.rm(targetPath, { recursive: true, force: true });
        }
        catch (err) {
            console.error(`Failed to delete ${targetPath}:`, err);
        }
    })));
});
const resetCandidatesPractical = (candidateIds, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    if (batch[0].status !== "ongoing") {
        throw new AppError_1.AppError("Batch is not ongoing", 400);
    }
    const examFolders = [
        ["videos", "PRACTICAL"],
        ["photos", "PRACTICAL"],
    ];
    const deletePaths = candidateIds.flatMap((candidateId) => {
        const basePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId);
        return examFolders.map((addOn) => path_1.default.join(basePath, ...addOn));
    });
    yield db_1.default
        .update(schema_1.candidates)
        .set({
        isPresentInPractical: false,
        practicalExamStatus: "notStarted",
        practicalStartedAt: null,
        practicalSubmittedAt: null,
    })
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId), (0, drizzle_orm_1.inArray)(schema_1.candidates.id, candidateIds)));
    yield Promise.all(deletePaths.map((targetPath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.rm(targetPath, { recursive: true, force: true });
        }
        catch (err) {
            console.error(`Failed to delete ${targetPath}:`, err);
        }
    })));
});
const resetCandidatesViva = (candidateIds, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    if (batch[0].status !== "ongoing") {
        throw new AppError_1.AppError("Batch is not ongoing", 400);
    }
    const examFolders = [["videos", "VIVA"]];
    const deletePaths = candidateIds.flatMap((candidateId) => {
        const basePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId);
        return examFolders.map((addOn) => path_1.default.join(basePath, ...addOn));
    });
    db_1.default.transaction((tx) => {
        tx.update(schema_1.candidates)
            .set({
            isPresentInViva: false,
            vivaExamStatus: "notStarted",
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId), (0, drizzle_orm_1.inArray)(schema_1.candidates.id, candidateIds)))
            .run();
        tx.delete(schema_1.examResponses)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.inArray)(schema_1.examResponses.candidateId, candidateIds), (0, drizzle_orm_1.eq)(schema_1.examResponses.batchId, batchId), (0, drizzle_orm_1.eq)(schema_1.examResponses.type, "VIVA")))
            .run();
    });
    yield Promise.all(deletePaths.map((targetPath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.rm(targetPath, { recursive: true, force: true });
        }
        catch (err) {
            console.error(`Failed to delete ${targetPath}:`, err);
        }
    })));
});
const markAssessorAsReached = (batchId, assessorId, picture, location) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (batch[0].isAssessorReached) {
        throw new AppError_1.AppError("Assessor already reached", 400);
    }
    if (!batch[0].isAssessorEvidenceRequired) {
        yield db_1.default
            .update(schema_1.batches)
            .set({
            isAssessorReached: true,
            assessorReachedAt: new Date().toISOString(),
            assessorCoordinates: null,
            assessorGroupPhoto: null,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId));
        return;
    }
    if (!picture) {
        throw new AppError_1.AppError("Assessor evidence is required", 400);
    }
    if (!location) {
        throw new AppError_1.AppError("Assessor location is required", 400);
    }
    if (!picture.mimetype.startsWith("image/")) {
        throw new AppError_1.AppError("Invalid file type", 400);
    }
    if (picture.size > 2 * 1024 * 1024) {
        throw new AppError_1.AppError("File size exceeds 2MB", 400);
    }
    const ext = picture.name.split(".").pop();
    if (!ext) {
        throw new AppError_1.AppError("Invalid file name", 400);
    }
    const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "group-photo", `${Date.now()}.${ext}`);
    const p = yield new Promise((resolve, reject) => {
        picture.mv(uploadPath, (err) => {
            if (err) {
                reject(new AppError_1.AppError("Error uploading file", 500));
            }
            else {
                resolve(uploadPath);
            }
        });
    });
    yield db_1.default
        .update(schema_1.batches)
        .set({
        isAssessorReached: true,
        assessorReachedAt: new Date().toISOString(),
        assessorCoordinates: JSON.stringify(location),
        assessorGroupPhoto: p,
    })
        .where((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId));
});
const startBatch = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    yield db_1.default
        .update(schema_1.batches)
        .set({
        status: "ongoing",
    })
        .where((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId));
});
const deleteBatches = (ids, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batches = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.inArray)(schema_1.batches.id, ids), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    if (ids.length !== batches.length) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    yield db_1.default
        .delete(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.inArray)(schema_1.batches.id, ids), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    yield Promise.all(ids.map((id) => {
        const folderPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", id);
        if (fs_1.default.existsSync(folderPath)) {
            fs_1.default.promises.rm(folderPath, { recursive: true, force: true });
        }
    }));
});
const submitCandidatePracticalResponses = (responses, candidateId, batchId, assessorId, evidence, comment, candidatePhoto, document) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch batch details
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch || batch.length === 0) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (batch[0].isPracticalVisibleToCandidate) {
        throw new AppError_1.AppError("Practical is visible to candidate, can't submit practical", 400);
    }
    if (!batch[0].practicalQuestionBank) {
        throw new AppError_1.AppError("No practical question bank found", 400);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("Mark yourself as reached", 400);
    }
    // Fetch candidate details
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.id, candidateId), (0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId)))
        .limit(1);
    if (!candidate || candidate.length === 0) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (candidate[0].practicalExamStatus === "submitted") {
        throw new AppError_1.AppError("Candidate already submitted", 400);
    }
    if (!candidate[0].isPresentInPractical) {
        throw new AppError_1.AppError("Candidate is not present in practical", 400);
    }
    if (responses.length === 0) {
        return; // Early exit if no responses
    }
    // Handle evidence upload if provided
    if (evidence) {
        if (!evidence.mimetype.startsWith("video/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (evidence.size > 100 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 100MB", 400);
        }
        const ext = evidence.name.split(".").pop();
        const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "PRACTICAL", `evidence.${ext}`);
        yield evidence.mv(uploadPath);
    }
    if (candidatePhoto) {
        if (!candidatePhoto.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (candidatePhoto.size > 2 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 2MB", 400);
        }
        const ext = candidatePhoto.name.split(".").pop();
        const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", `photo.${ext}`);
        yield candidatePhoto.mv(uploadPath);
    }
    if (document) {
        if (!document.mimetype.startsWith("application/pdf")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (document.size > 2 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 2MB", 400);
        }
        const ext = document.name.split(".").pop();
        const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", `document.${ext}`);
        yield document.mv(uploadPath);
    }
    // Execute database transaction
    db_1.default.transaction((tx) => {
        // Insert exam responses
        tx.insert(schema_1.examResponses)
            .values(responses.map((response) => ({
            questionId: response.questionId,
            answerId: "no-answer-mentioned-practical-submitted-by-assessor",
            marksObtained: response.marksObtained,
            candidateId: candidateId,
            batchId: batchId,
            startedAt: new Date().toISOString(),
            endedAt: new Date().toISOString(),
            type: "PRACTICAL",
        })))
            .run();
        tx.update(schema_1.candidates)
            .set({
            practicalExamStatus: "submitted",
            isPresentInPractical: true,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, candidateId))
            .run();
        tx.insert(schema_1.comments).values({
            candidateId: candidateId,
            batchId: batchId,
            comment: comment,
            type: "PRACTICAL",
        });
    });
});
const submitCandidateVivaResponses = (responses, candidateId, batchId, assessorId, evidence, comment) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch batch details
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch || batch.length === 0) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].vivaQuestionBank) {
        throw new AppError_1.AppError("No viva question bank found", 400);
    }
    if (!batch[0].isAssessorReached) {
        throw new AppError_1.AppError("Mark yourself as reached", 400);
    }
    // Fetch candidate details
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.id, candidateId), (0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId)))
        .limit(1);
    if (!candidate || candidate.length === 0) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (candidate[0].vivaExamStatus === "submitted") {
        throw new AppError_1.AppError("Candidate already submitted", 400);
    }
    if (!candidate[0].isPresentInViva) {
        throw new AppError_1.AppError("Candidate is not present in viva", 400);
    }
    if (responses.length === 0) {
        return; // Early exit if no responses
    }
    // Handle evidence upload if provided
    if (evidence) {
        if (!evidence.mimetype.startsWith("video/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (evidence.size > 100 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 100MB", 400);
        }
        const ext = evidence.name.split(".").pop();
        const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "VIVA", `evidence.${ext}`);
        yield evidence.mv(uploadPath);
    }
    // Execute database transaction
    db_1.default.transaction((tx) => {
        // Insert exam responses
        if (comment) {
            tx.insert(schema_1.comments).values({
                candidateId: candidateId,
                batchId: batchId,
                comment: comment,
                type: "VIVA",
            });
        }
        tx.insert(schema_1.examResponses)
            .values(responses.map((response) => ({
            questionId: response.questionId,
            answerId: "no-answer-mentioned-viva-submitted-by-assessor",
            marksObtained: response.marksObtained,
            candidateId: candidateId,
            batchId: batchId,
            startedAt: new Date().toISOString(),
            endedAt: new Date().toISOString(),
            type: "VIVA",
        })))
            .run();
        // Update candidate exam status
        tx.update(schema_1.candidates)
            .set({
            vivaExamStatus: "submitted",
            isPresentInViva: true,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, candidateId))
            .run();
    });
});
const getPracticalQuestionBank = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("batch not found", 404);
    }
    if (!batch[0].practicalQuestionBank) {
        throw new AppError_1.AppError("practical question bank not found", 404);
    }
    return JSON.parse(batch[0].practicalQuestionBank);
});
const getVivaQuestionBank = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)))
        .limit(1);
    if (!batch) {
        throw new AppError_1.AppError("batch not found", 404);
    }
    if (!batch[0].vivaQuestionBank) {
        throw new AppError_1.AppError("viva question bank not found", 404);
    }
    return JSON.parse(batch[0].vivaQuestionBank);
});
const uploadCandidatePracticalOnboardingFiles = (batchId, candidateId, assessorId, adhar, photo) => __awaiter(void 0, void 0, void 0, function* () {
    if (!adhar || !photo) {
        throw new AppError_1.AppError("Adhar and photo are required", 400);
    }
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    if (!batch || batch.length === 0) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    const candidate = yield db_1.default
        .select()
        .from(schema_1.candidates)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.candidates.id, candidateId), (0, drizzle_orm_1.eq)(schema_1.candidates.batchId, batchId)));
    if (!candidate || candidate.length === 0) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (adhar) {
        if (!adhar.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (adhar.size > 5 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 5MB", 400);
        }
        const adharExt = adhar.name.split(".").pop();
        const adharUploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "practical-onboarding", `adhar.${adharExt}`);
        yield adhar.mv(adharUploadPath);
    }
    if (photo) {
        if (!photo.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (photo.size > 2 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 2MB", 400);
        }
        const photoExt = photo.name.split(".").pop();
        const photoUploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "practical-onboarding", `photo.${photoExt}`);
        yield photo.mv(photoUploadPath);
    }
});
const syncCandidate = (batchId, candidateId, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    if (!token) {
        throw new AppError_1.AppError("server token is required", 401);
    }
    const randomPhotos = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", "THEORY");
    try {
        const isSyncedResponse = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/batches/${batchId}/candidates/${candidateId}/is-synced`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (isSyncedResponse.status !== 200) {
            return;
        }
        const batch = yield db_1.default
            .select()
            .from(schema_1.batches)
            .where((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId));
        const candidate = yield db_1.default
            .select()
            .from(schema_1.candidates)
            .where((0, drizzle_orm_1.eq)(schema_1.candidates.id, candidateId));
        if (!candidate) {
            return;
        }
        const randomVideos = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "THEORY");
        let adharName = "";
        let selfieName = "";
        let adharContentType = "";
        let selfieContentType = "";
        if (fs_1.default.existsSync(path_1.default.join(randomPhotos, "..", "..", "adhar"))) {
            const adhar = yield fs_1.default.promises.readdir(path_1.default.join(randomPhotos, "..", "..", "adhar"));
            if (adhar.length === 0) {
            }
            else {
                adharName = adhar[0];
                adharContentType = mime_types_1.default.lookup(adharName) || "application/octet-stream";
            }
        }
        if (fs_1.default.existsSync(path_1.default.join(randomPhotos, "..", "..", "selfie"))) {
            const selfie = yield fs_1.default.promises.readdir(path_1.default.join(randomPhotos, "..", "..", "selfie"));
            if (selfie.length === 0) {
            }
            else {
                selfieName = selfie[0];
                selfieContentType =
                    mime_types_1.default.lookup(selfieName) || "application/octet-stream";
            }
        }
        const signedUrlsToUploadAdharSelfie = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-candidate-adhar-or-selfie?adharFileName=${adharName}&selfieFileName=${selfieName}&adharContentType=${adharContentType}&selfieContentType=${selfieContentType}`, { headers: { Authorization: `Bearer ${token}` } });
        const uploadAdharSelfiePromises = [];
        if (adharName) {
            const adharFilePath = path_1.default.join(randomPhotos, "..", "..", "adhar", adharName);
            if (fs_1.default.existsSync(adharFilePath)) {
                const buffer = fs_1.default.readFileSync(adharFilePath);
                uploadAdharSelfiePromises.push(axios_1.default.put(signedUrlsToUploadAdharSelfie.data.data.adhar.url, buffer, {
                    headers: {
                        "Content-Type": adharContentType,
                    },
                }));
            }
        }
        if (selfieName) {
            const selfieFilePath = path_1.default.join(randomPhotos, "..", "..", "selfie", selfieName);
            const buffer = fs_1.default.readFileSync(selfieFilePath);
            if (fs_1.default.existsSync(selfieFilePath)) {
                uploadAdharSelfiePromises.push(axios_1.default.put(signedUrlsToUploadAdharSelfie.data.data.selfie.url, buffer, {
                    headers: {
                        "Content-Type": selfieContentType,
                    },
                }));
            }
        }
        yield Promise.all(uploadAdharSelfiePromises);
        console.log("Adhar and selfie uploaded successfully");
        const theoryResponses = yield db_1.default
            .select()
            .from(schema_1.examResponses)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.examResponses.candidateId, candidateId), (0, drizzle_orm_1.eq)(schema_1.examResponses.type, "THEORY")));
        const practicalResponses = yield db_1.default
            .select()
            .from(schema_1.examResponses)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.examResponses.candidateId, candidateId), (0, drizzle_orm_1.eq)(schema_1.examResponses.type, "PRACTICAL")));
        const vivaResponses = yield db_1.default
            .select()
            .from(schema_1.examResponses)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.examResponses.candidateId, candidateId), (0, drizzle_orm_1.eq)(schema_1.examResponses.type, "VIVA")));
        const feedback = yield db_1.default
            .select()
            .from(schema_1.candidateFeedback)
            .where((0, drizzle_orm_1.eq)(schema_1.candidateFeedback.candidateId, candidateId));
        const feedbankQuestion = (_a = feedback[0]) === null || _a === void 0 ? void 0 : _a.questions;
        const finalResponses = {
            assessorDetails: {},
            candidateDetails: {
                isEvidanceUploaded: (_b = candidate[0]) === null || _b === void 0 ? void 0 : _b.isEvidenceUploaded,
                isPresentInTheory: (_c = candidate[0]) === null || _c === void 0 ? void 0 : _c.isPresentInTheory,
                isPresentInPractical: (_d = candidate[0]) === null || _d === void 0 ? void 0 : _d.isPresentInPractical,
                isPresentInViva: (_e = candidate[0]) === null || _e === void 0 ? void 0 : _e.isPresentInViva,
                theoryExamStatus: (_f = candidate[0]) === null || _f === void 0 ? void 0 : _f.theoryExamStatus,
                practicalExamStatus: (_g = candidate[0]) === null || _g === void 0 ? void 0 : _g.practicalExamStatus,
                vivaExamStatus: (_h = candidate[0]) === null || _h === void 0 ? void 0 : _h.vivaExamStatus,
                theoryStartedAt: (_j = candidate[0]) === null || _j === void 0 ? void 0 : _j.theoryStartedAt,
                theorySubmittedAt: (_k = candidate[0]) === null || _k === void 0 ? void 0 : _k.theorySubmittedAt,
                practicalStartedAt: (_l = candidate[0]) === null || _l === void 0 ? void 0 : _l.practicalStartedAt,
                practicalSubmittedAt: (_m = candidate[0]) === null || _m === void 0 ? void 0 : _m.practicalSubmittedAt,
                faceHiddenCount: (_o = candidate[0]) === null || _o === void 0 ? void 0 : _o.faceHiddenCount,
                tabSwitchCount: (_p = candidate[0]) === null || _p === void 0 ? void 0 : _p.tabSwitchCount,
                exitFullScreenCount: (_q = candidate[0]) === null || _q === void 0 ? void 0 : _q.exitFullScreenCount,
                multipleFaceDetectionCount: (_r = candidate[0]) === null || _r === void 0 ? void 0 : _r.multipleFaceDetectionCount,
                candidateSelfieCoordinates: ((_s = candidate[0]) === null || _s === void 0 ? void 0 : _s.candidateSelfieCoordinates)
                    ? // @ts-ignore
                        JSON.parse((_t = candidate[0]) === null || _t === void 0 ? void 0 : _t.candidateSelfieCoordinates)
                    : {},
                candidateSelfieTakenAt: (_u = candidate[0]) === null || _u === void 0 ? void 0 : _u.candidateSelfieTakenAt,
                adharcardPicture: signedUrlsToUploadAdharSelfie.data.data.adhar.location,
                candidateSelfie: signedUrlsToUploadAdharSelfie.data.data.selfie.location,
            },
            feedback: typeof feedbankQuestion === "string"
                ? JSON.parse(feedbankQuestion)
                : feedbankQuestion,
            theory: [],
            practical: [],
            viva: [],
        };
        const practicalComment = yield db_1.default
            .select()
            .from(schema_1.comments)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.comments.candidateId, candidateId), (0, drizzle_orm_1.eq)(schema_1.comments.batchId, batchId), (0, drizzle_orm_1.eq)(schema_1.comments.testType, "PRACTICAL")));
        const vivaComment = yield db_1.default
            .select()
            .from(schema_1.comments)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.comments.candidateId, candidateId), (0, drizzle_orm_1.eq)(schema_1.comments.batchId, batchId), (0, drizzle_orm_1.eq)(schema_1.comments.testType, "VIVA")));
        if (practicalComment.length > 0) {
            finalResponses.practicalComment = practicalComment[0].comment;
        }
        if (vivaComment.length > 0) {
            finalResponses.vivaComment = vivaComment[0].comment;
        }
        theoryResponses.forEach((response) => {
            // @ts-ignore
            finalResponses.theory.push({
                questionId: response.questionId,
                answerId: response.answerId,
                startedAt: response.startedAt,
                endedAt: response.endedAt,
            });
        });
        practicalResponses.forEach((response) => {
            var _a;
            const obj = {
                questionId: response.questionId,
            };
            // @ts-ignore
            if ((_a = batch[0]) === null || _a === void 0 ? void 0 : _a.isPracticalVisibleToCandidate) {
                // @ts-ignore
                obj["startedAt"] = response.startedAt;
                // @ts-ignore
                obj["endedAt"] = response.endedAt;
                // @ts-ignore
                obj["answerId"] = response.answerId;
            }
            else {
                // @ts-ignore
                obj["marksObtained"] = response.marksObtained || 0;
            }
            // @ts-ignore
            finalResponses.practical.push(obj);
        });
        vivaResponses.forEach((response) => {
            // @ts-ignore
            finalResponses.viva.push({
                questionId: response.questionId,
                answerId: response.answerId,
                marksObtained: response.marksObtained || 0,
            });
        });
        const assessorDetails = {
            isAssessorReached: (_v = batch[0]) === null || _v === void 0 ? void 0 : _v.isAssessorReached,
            assessorReachedAt: (_w = batch[0]) === null || _w === void 0 ? void 0 : _w.assessorReachedAt,
            assessorCoordinates: ((_x = batch[0]) === null || _x === void 0 ? void 0 : _x.assessorCoordinates)
                ? // @ts-ignore
                    JSON.parse(batch[0].assessorCoordinates)
                : {},
            assessorGroupPhoto: "",
            pmkyChecklist: ((_y = batch[0]) === null || _y === void 0 ? void 0 : _y.isPmkyCheckListRequired)
                ? batch[0].pmkyChecklist
                : null,
        };
        if (batch[0].isAssessorEvidenceRequired) {
            if (fs_1.default.existsSync(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "group-photo"))) {
                const evidences = yield fs_1.default.promises.readdir(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "group-photo"));
                const responses = yield Promise.all(evidences.map((evidence) => {
                    return axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/presigned-url-for-assessor`, { headers: { Authorization: `Bearer ${token}` } });
                }));
                const uploadPromises = evidences.map((evidence, index) => {
                    const filePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "group-photo", evidence);
                    if (!fs_1.default.existsSync(filePath)) {
                        throw new AppError_1.AppError("File does not exist: " + filePath, 404);
                    }
                    const buffer = fs_1.default.readFileSync(filePath);
                    return axios_1.default.put(responses[index].data.data.url, buffer, {
                        headers: {
                            "Content-Type": mime_types_1.default.lookup(evidence) || "application/octet-stream",
                        },
                    });
                });
                yield Promise.all(uploadPromises);
                assessorDetails.assessorGroupPhoto = responses[0].data.data.location;
            }
        }
        finalResponses.assessorDetails = assessorDetails;
        yield axios_1.default.post(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-responses`, {
            responses: finalResponses,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (((_z = error.response) === null || _z === void 0 ? void 0 : _z.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            if (((_0 = error.response) === null || _0 === void 0 ? void 0 : _0.status) === 404) {
                throw new AppError_1.AppError("resource not found", 404);
            }
            if (((_1 = error.response) === null || _1 === void 0 ? void 0 : _1.status) === 400) {
                throw new AppError_1.AppError(error.response.data.message || "something went wrong", 400);
            }
            throw error;
        }
        throw new AppError_1.AppError("something went wrong", 500);
    }
});
const uploadPmkyChecklistFiles = (assessorId, batchId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    if (!batch || batch.length === 0) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isPmkyCheckListRequired) {
        throw new AppError_1.AppError("Pmky checklist is not required", 400);
    }
    if (fs_1.default.existsSync(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "pmky-checklist", data.questionId))) {
        yield fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "pmky-checklist", data.questionId), { recursive: true, force: true });
    }
    yield Promise.all(data.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        if (!file.mimetype.startsWith("image/")) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (file.size > 50 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 2MB", 400);
        }
        const ext = file.name.split(".").pop();
        if (!ext) {
            throw new AppError_1.AppError("Invalid file name", 400);
        }
        const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "assessor", "pmky-checklist", data.questionId, `${Date.now()}.${ext}`);
        yield file.mv(uploadPath);
    })));
});
const getPmkyChecklist = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    if (!batch || batch.length === 0) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isPmkyCheckListRequired) {
        throw new AppError_1.AppError("Pmky checklist is not required", 400);
    }
    let checklist = batch[0].pmkyChecklist;
    if (!checklist) {
        throw new AppError_1.AppError("Pmky checklist not found", 404);
    }
    checklist = typeof checklist === "string" ? JSON.parse(checklist) : checklist;
    return checklist;
});
const submitPmkyChecklist = (batchId, assessorId, responses) => __awaiter(void 0, void 0, void 0, function* () {
    if (responses.length === 0) {
        console.log("No responses provided");
        return;
    }
    const batch = yield db_1.default
        .select()
        .from(schema_1.batches)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
    if (!batch || batch.length === 0) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch[0].isPmkyCheckListRequired) {
        throw new AppError_1.AppError("Pmky checklist is not required", 400);
    }
    if (!batch[0].pmkyChecklist) {
        throw new AppError_1.AppError("Pmky checklist not found", 404);
    }
    let checklist = batch[0].pmkyChecklist;
    if (typeof checklist === "string") {
        checklist = JSON.parse(checklist);
    }
    if (!checklist) {
        throw new AppError_1.AppError("Pmky checklist not found", 404);
    }
    checklist.questions.forEach((question) => {
        for (const response of responses) {
            if (question._id === response.questionId) {
                question.yesOrNo = response.yesOrNo;
                question.remarks = response.remarks;
                break;
            }
        }
    });
    checklist.submitted = true;
    checklist.submittedAt = new Date().toISOString();
    yield db_1.default
        .update(schema_1.batches)
        .set({
        pmkyChecklist: JSON.stringify(checklist),
    })
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.batches.id, batchId), (0, drizzle_orm_1.eq)(schema_1.batches.assessor, assessorId)));
});
exports.default = {
    getAssignedBatches,
    saveBatchOffline,
    getLoadedBatches,
    markAttendanceInTheory,
    markAttendanceInPractical,
    markAttendanceInViva,
    getCandidateList,
    resetCandidates,
    markAssessorAsReached,
    startBatch,
    deleteBatches,
    submitCandidatePracticalResponses,
    submitCandidateVivaResponses,
    resetCandidatesPractical,
    resetCandidatesViva,
    syncCandidate,
    getPracticalQuestionBank,
    getVivaQuestionBank,
    getCandidateListFromMainServer,
    uploadPmkyChecklistFiles,
    getPmkyChecklist,
    submitPmkyChecklist,
    uploadCandidatePracticalOnboardingFiles,
};
