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
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const AppError_1 = require("../utils/AppError");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const mime_types_1 = __importDefault(require("mime-types"));
const prisma = new client_1.PrismaClient();
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
    var _a, _b, _c;
    try {
        const response = yield axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const { batch, theoryQuestionBank, practicalQuestionBank, vivaQuestionBank, candidates, } = response.data.data;
        yield prisma.$transaction([
            prisma.batch.create({
                data: {
                    id: batch._id,
                    assessor: batch.assessor,
                    name: batch.name,
                    type: batch.type,
                    status: batch.status,
                    noOfCandidates: batch.noOfCandidates,
                    durationInMin: batch.durationInMin,
                    no: batch.no,
                    startDate: batch.startDate,
                    endDate: batch.endDate,
                    theoryQuestionBank: JSON.stringify(theoryQuestionBank),
                    practicalQuestionBank: JSON.stringify(practicalQuestionBank),
                    vivaQuestionBank: JSON.stringify(vivaQuestionBank),
                    isAssessorReached: false,
                    isCandidateVideoRequired: batch.isCandidateVideoRequired,
                    isCandidatePhotosRequired: batch.isCandidatePhotosRequired,
                    isCandidateLocationRequired: batch.isCandidateLocationRequired,
                    isCandidateAdharRequired: batch.isCandidateAdharRequired,
                    isCandidateSelfieRequired: batch.isCandidateSelfieRequired,
                    isPracticalVisibleToCandidate: batch.isPracticalVisibleToCandidate,
                    isSuspiciousActivityDetectionRequired: batch.isSuspiciousActivityDetectionRequired,
                    isAssessorEvidenceRequired: batch.isAssessorEvidenceRequired,
                    assessorReachedAt: null,
                    assessorCoordinates: null,
                    assessorGroupPhoto: null,
                },
            }),
            prisma.candidate.createMany({
                data: candidates.docs.map((candidate) => ({
                    id: candidate._id,
                    name: candidate.name,
                    email: candidate.email,
                    phone: candidate.phone,
                    address: candidate.address,
                    batchId: candidate.batch,
                    fatherName: candidate.fatherName,
                    enrollmentNo: candidate.enrollmentNo,
                    isActive: candidate.isActive,
                    password: candidate.password,
                    gender: candidate.gender,
                    adharNo: candidate.adharNo,
                    isTheoryStarted: false,
                    isEvidanceUploaded: false,
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
                })),
            }),
        ]);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
        }
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2011") {
                throw new AppError_1.AppError(`Null constraint violation on field: ${(_b = error.meta) === null || _b === void 0 ? void 0 : _b.constraint}`, 400);
            }
            if (error.code === "P2002") {
                throw new AppError_1.AppError(`Unique constraint violation on field: ${(_c = error.meta) === null || _c === void 0 ? void 0 : _c.target}`, 400);
            }
        }
        throw new AppError_1.AppError("internal server error", 500);
    }
});
const getLoadedBatches = (assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("assessorId", assessorId);
        const batches = yield prisma.batch.findMany({
            where: { assessor: assessorId },
        });
        return batches;
    }
    catch (error) {
        throw new AppError_1.AppError("internal server error", 500);
    }
});
const getCandidateList = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    return yield prisma.candidate.findMany({
        where: {
            batchId: batchId,
        },
    });
});
const markAttendanceInTheory = (candidates, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batch = yield prisma.batch.findFirst({
            where: { id: batchId, assessor: assessorId },
        });
        if (!batch) {
            throw new AppError_1.AppError("Batch not found", 404);
        }
        if (!batch.theoryQuestionBank) {
            throw new AppError_1.AppError("no theory question bank found", 400);
        }
        if (batch.status === "assigned") {
            throw new AppError_1.AppError("Batch is not started yet", 400);
        }
        if (batch.status === "completed") {
            throw new AppError_1.AppError("Batch is already completed", 400);
        }
        if (!batch.isAssessorReached) {
            throw new AppError_1.AppError("mark yourself as reached", 400);
        }
        const updatedCandidates = yield prisma.candidate.updateMany({
            where: {
                id: { in: candidates },
                batchId: batchId,
            },
            data: {
                isPresentInTheory: true,
            },
        });
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
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.practicalQuestionBank) {
        throw new AppError_1.AppError("no practical question bank found", 400);
    }
    if (batch.status === "assigned") {
        throw new AppError_1.AppError("Batch is not started yet", 400);
    }
    if (batch.status === "completed") {
        throw new AppError_1.AppError("Batch is already completed", 400);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const updatedCandidates = yield prisma.candidate.updateMany({
        where: {
            id: { in: candidates },
            batchId: batchId,
        },
        data: {
            isPresentInPractical: true,
        },
    });
    return updatedCandidates;
});
const markAttendanceInViva = (candidates, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.vivaQuestionBank) {
        throw new AppError_1.AppError("no viva question bank found", 400);
    }
    if (batch.status === "assigned") {
        throw new AppError_1.AppError("Batch is not started yet", 400);
    }
    if (batch.status === "completed") {
        throw new AppError_1.AppError("Batch is already completed", 400);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const updatedCandidates = yield prisma.candidate.updateMany({
        where: {
            id: { in: candidates },
            batchId: batchId,
        },
        data: {
            isPresentInViva: true,
        },
    });
    return updatedCandidates;
});
const resetCandidates = (candidateIds, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    if (batch.status !== "ongoing") {
        throw new AppError_1.AppError("Batch is not ongoing", 400);
    }
    yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield Promise.all([
            candidateIds.map((candidateId) => __awaiter(void 0, void 0, void 0, function* () {
                return fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", "THEORY"), { recursive: true, force: true });
            })),
            candidateIds.map((candidateId) => __awaiter(void 0, void 0, void 0, function* () {
                return fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "THEORY"), { recursive: true, force: true });
            })),
            candidateIds.map((candidateId) => __awaiter(void 0, void 0, void 0, function* () {
                return fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "adhar"), { recursive: true, force: true });
            })),
            candidateIds.map((candidateId) => __awaiter(void 0, void 0, void 0, function* () {
                return fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "selfie"), { recursive: true, force: true });
            })),
        ]);
        yield tx.examResponse.deleteMany({
            where: {
                candidateId: { in: candidateIds },
                batchId: batchId,
                type: "THEORY",
            },
        });
        yield tx.candidate.updateMany({
            where: {
                id: { in: candidateIds },
                batchId: batchId,
            },
            data: {
                isPresentInTheory: false,
                isPresentInPractical: false,
                isPresentInViva: false,
                isTheorySubmitted: false,
                theoryExamStatus: "notStarted",
                practicalExamStatus: "notStarted",
                vivaExamStatus: "notStarted",
                multipleFaceDetectionCount: 0,
                isEvidanceUploaded: false,
                faceHiddenCount: 0,
                tabSwitchCount: 0,
                exitFullScreenCount: 0,
            },
        });
    }));
});
const resetCandidatesPractical = (candidateIds, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    if (batch.status !== "ongoing") {
        throw new AppError_1.AppError("Batch is not ongoing", 400);
    }
    yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.examResponse.deleteMany({
            where: {
                candidateId: { in: candidateIds },
                batchId: batchId,
                type: "PRACTICAL",
            },
        });
        yield tx.candidate.updateMany({
            where: {
                id: { in: candidateIds },
                batchId: batchId,
            },
            data: {
                isPresentInPractical: false,
                practicalExamStatus: "notStarted",
                practicalStartedAt: null,
                practicalSubmittedAt: null,
            },
        });
        yield Promise.all([
            candidateIds.map((candidateId) => __awaiter(void 0, void 0, void 0, function* () {
                return fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "PRACTICAL"), { recursive: true, force: true });
            })),
            candidateIds.map((candidateId) => __awaiter(void 0, void 0, void 0, function* () {
                return fs_1.default.promises.rm(path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", "Practical"), { recursive: true, force: true });
            })),
        ]);
    }));
});
const resetCandidatesViva = (candidateIds, batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    if (batch.status !== "ongoing") {
        throw new AppError_1.AppError("Batch is not ongoing", 400);
    }
    const examFolders = [["videos", "VIVA"]];
    const deletePaths = candidateIds.flatMap((candidateId) => {
        const basePath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId);
        return examFolders.map((addOn) => path_1.default.join(basePath, ...addOn));
    });
    yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.candidate.updateMany({
            where: {
                id: { in: candidateIds },
                batchId: batchId,
            },
            data: {
                isPresentInViva: false,
                vivaExamStatus: "notStarted",
            },
        });
        yield tx.examResponse.deleteMany({
            where: {
                candidateId: { in: candidateIds },
                batchId: batchId,
                type: "VIVA",
            },
        });
        yield Promise.all(deletePaths.map((targetPath) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.rm(targetPath, { recursive: true, force: true });
            }
            catch (err) {
                console.error(`Failed to delete ${targetPath}:`, err);
            }
        })));
    }));
});
const markAssessorAsReached = (batchId, assessorId, picture, location) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
            assessor: assessorId,
        },
        select: {
            isAssessorEvidenceRequired: true,
            isAssessorReached: true,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (batch.isAssessorReached) {
        throw new AppError_1.AppError("Assessor already reached", 400);
    }
    if (!batch.isAssessorEvidenceRequired) {
        yield prisma.batch.update({
            where: {
                id: batchId,
            },
            data: {
                isAssessorReached: true,
                assessorReachedAt: new Date(),
                assessorCoordinates: null,
                assessorGroupPhoto: null,
            },
        });
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
    yield prisma.batch.update({
        where: {
            id: batchId,
        },
        data: {
            isAssessorReached: true,
            assessorReachedAt: new Date(),
            assessorCoordinates: JSON.stringify(location),
            assessorGroupPhoto: p,
        },
    });
});
const startBatch = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
            assessor: assessorId,
        },
        select: {
            isAssessorEvidenceRequired: true,
            isAssessorReached: true,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    yield prisma.batch.update({
        where: {
            id: batchId,
        },
        data: {
            status: "ongoing",
        },
    });
});
const deleteBatches = (ids, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batches = yield prisma.batch.findMany({
        where: {
            id: { in: ids },
            assessor: assessorId,
        },
    });
    if (ids.length !== batches.length) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(ids.map((id) => {
            const folderPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", id);
            if (fs_1.default.existsSync(folderPath)) {
                fs_1.default.promises.rm(folderPath, { recursive: true, force: true });
            }
        }));
        yield tx.batch.deleteMany({
            where: {
                id: { in: ids },
                assessor: assessorId,
            },
        });
    }));
});
const submitCandidatePracticalResponses = (responses, candidateId, batchId, assessorId, evidence) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
        select: {
            isPracticalVisibleToCandidate: true,
            practicalQuestionBank: true,
            isAssessorReached: true,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (batch.isPracticalVisibleToCandidate) {
        throw new AppError_1.AppError("Practical is visible to candidate,can't submit practical", 400);
    }
    if (!batch.practicalQuestionBank) {
        throw new AppError_1.AppError("no practical question bank found", 400);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const candidate = yield prisma.candidate.findFirst({
        where: { id: candidateId, batchId: batchId },
        select: {
            isPresentInPractical: true,
            practicalExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (candidate.practicalExamStatus === "submitted") {
        throw new AppError_1.AppError("Candidate already submitted", 400);
    }
    if (!candidate.isPresentInPractical) {
        throw new AppError_1.AppError("Candidate is not present in practical", 400);
    }
    if (responses.length === 0) {
        throw new AppError_1.AppError("No responses found", 400);
    }
    if (evidence) {
        console.log("evidence", evidence.mimetype);
        if (!((_a = evidence === null || evidence === void 0 ? void 0 : evidence.mimetype) === null || _a === void 0 ? void 0 : _a.startsWith("video/"))) {
            throw new AppError_1.AppError("Invalid file type", 400);
        }
        if (evidence.size > 100 * 1024 * 1024) {
            throw new AppError_1.AppError("File size exceeds 100MB", 400);
        }
        const ext = evidence.name.split(".").pop();
        const uploadPath = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "PRACTICAL", `evidence.${ext}`);
        yield evidence.mv(uploadPath);
    }
    yield prisma.$transaction([
        prisma.examResponse.createMany({
            data: responses.map((response) => ({
                questionId: response.questionId,
                answerId: "no-answer-mentioned-practial-submitted-by-assessor",
                marksObtained: response.marksObtained,
                candidateId: candidateId,
                batchId: batchId,
                startedAt: new Date(),
                endedAt: new Date(),
                type: "PRACTICAL",
            })),
        }),
        prisma.candidate.update({
            where: {
                id: candidateId,
            },
            data: {
                practicalExamStatus: "submitted",
                isPresentInPractical: false,
            },
        }),
    ]);
});
const submitCandidateVivaResponses = (responses, candidateId, batchId, assessorId, evidence) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
        throw new AppError_1.AppError("Batch not found", 404);
    }
    if (!batch.vivaQuestionBank) {
        throw new AppError_1.AppError("no viva question bank found", 400);
    }
    if (!batch.isAssessorReached) {
        throw new AppError_1.AppError("mark yourself as reached", 400);
    }
    const candidate = yield prisma.candidate.findFirst({
        where: { id: candidateId, batchId: batchId },
        select: {
            isPresentInViva: true,
            vivaExamStatus: true,
        },
    });
    if (!candidate) {
        throw new AppError_1.AppError("Candidate not found", 404);
    }
    if (candidate.vivaExamStatus === "submitted") {
        throw new AppError_1.AppError("Candidate already submitted", 400);
    }
    if (!candidate.isPresentInViva) {
        throw new AppError_1.AppError("Candidate is not present in viva", 400);
    }
    if (responses.length === 0) {
        throw new AppError_1.AppError("No responses found", 400);
    }
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
    yield prisma.$transaction([
        prisma.examResponse.createMany({
            data: responses.map((response) => ({
                questionId: response.questionId,
                answerId: "no-answer-mentioned-viva-submitted-by-assessor",
                marksObtained: response.marksObtained,
                candidateId: candidateId,
                batchId: batchId,
                startedAt: new Date(),
                endedAt: new Date(),
                type: "VIVA",
            })),
        }),
        prisma.candidate.update({
            where: {
                id: candidateId,
            },
            data: {
                vivaExamStatus: "submitted",
                isPresentInViva: false,
            },
        }),
    ]);
});
const getPracticalQuestionBank = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
            assessor: assessorId,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("batch not found", 404);
    }
    if (!batch.practicalQuestionBank) {
        throw new AppError_1.AppError("practical question bank not found", 404);
    }
    return JSON.parse(batch.practicalQuestionBank);
});
const getVivaQuestionBank = (batchId, assessorId) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield prisma.batch.findFirst({
        where: {
            id: batchId,
            assessor: assessorId,
        },
    });
    if (!batch) {
        throw new AppError_1.AppError("batch not found", 404);
    }
    if (!batch.vivaQuestionBank) {
        throw new AppError_1.AppError("viva question bank not found", 404);
    }
    return JSON.parse(batch.vivaQuestionBank);
});
const syncCandidate = (batchId, candidateId, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!token) {
        throw new AppError_1.AppError("server token is required", 401);
    }
    const randomPhotos = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "photos", "THEORY");
    try {
        const candidate = yield prisma.candidate.findFirst({
            where: {
                id: candidateId,
            },
            select: {
                batch: true,
                isEvidanceUploaded: true,
                isPresentInTheory: true,
                isPresentInPractical: true,
                isPresentInViva: true,
                theoryExamStatus: true,
                practicalExamStatus: true,
                vivaExamStatus: true,
                theoryStartedAt: true,
                theorySubmittedAt: true,
                practicalStartedAt: true,
                practicalSubmittedAt: true,
                faceHiddenCount: true,
                tabSwitchCount: true,
                exitFullScreenCount: true,
                multipleFaceDetectionCount: true,
                candidateSelfieCoordinates: true,
                candidateSelfieTakenAt: true,
            },
        });
        if (!candidate) {
            return;
        }
        if (fs_1.default.existsSync(randomPhotos)) {
            const photos = yield fs_1.default.promises.readdir(randomPhotos);
            const signedUrlsToUploadRandomPhotos = yield Promise.all(photos.map((photo) => axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=image&fileName=${photo}`, { headers: { Authorization: `Bearer ${token}` } })));
            yield Promise.all(photos.map((photo, index) => {
                const filePath = path_1.default.join(randomPhotos, photo);
                if (fs_1.default.existsSync(filePath)) {
                    const buffer = fs_1.default.readFileSync(filePath);
                    return axios_1.default.put(signedUrlsToUploadRandomPhotos[index].data.data.url, buffer, {
                        headers: {
                            "Content-Type": mime_types_1.default.lookup(photo) || "application/octet-stream",
                        },
                    });
                }
            }));
        }
        if (fs_1.default.existsSync(path_1.default.join(randomPhotos, "..", "PRACTICAL"))) {
            const practicalPhotos = yield fs_1.default.promises.readdir(path_1.default.join(randomPhotos, "..", "PRACTICAL"));
            const signedUrlsToUploadPracticalPhotos = yield Promise.all(practicalPhotos.map((photo) => axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=image&fileName=${photo}`, { headers: { Authorization: `Bearer ${token}` } })));
            yield Promise.all(practicalPhotos.map((photo, index) => {
                const filePath = path_1.default.join(randomPhotos, "..", "PRACTICAL", photo);
                if (!fs_1.default.existsSync(filePath)) {
                    throw new AppError_1.AppError("File does not exist: " + filePath, 404);
                }
                const buffer = fs_1.default.readFileSync(filePath);
                return axios_1.default.put(signedUrlsToUploadPracticalPhotos[index].data.data.url, buffer, {
                    headers: {
                        "Content-Type": mime_types_1.default.lookup(photo) || "application/octet-stream",
                    },
                });
            }));
        }
        const randomVideos = path_1.default.join(__dirname, "..", "..", "uploads", "batches", batchId, "evidences", "candidates", candidateId, "videos", "THEORY");
        if (fs_1.default.existsSync(path_1.default.join(randomVideos, "..", "PRACTICAL"))) {
            const practicalVideos = yield fs_1.default.promises.readdir(path_1.default.join(randomVideos, "..", "PRACTICAL"));
            const signedUrlsToUploadPracticalVideos = yield Promise.all(practicalVideos.map((video) => axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${video}`, { headers: { Authorization: `Bearer ${token}` } })));
            yield Promise.all(practicalVideos.map((video, index) => {
                const filePath = path_1.default.join(randomVideos, "..", "PRACTICAL", video);
                if (!fs_1.default.existsSync(filePath)) {
                    throw new AppError_1.AppError("File does not exist: " + filePath, 404);
                }
                const buffer = fs_1.default.readFileSync(filePath);
                return axios_1.default.put(signedUrlsToUploadPracticalVideos[index].data.data.url, buffer, {
                    headers: {
                        "Content-Type": mime_types_1.default.lookup(video) || "application/octet-stream",
                    },
                });
            }));
        }
        if (fs_1.default.existsSync(path_1.default.join(randomVideos, "..", "VIVA"))) {
            const vivaVideos = yield fs_1.default.promises.readdir(path_1.default.join(randomVideos, "..", "VIVA"));
            const signedUrlsToUploadVivaVideos = yield Promise.all(vivaVideos.map((video) => axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=viva&evidenceType=video&fileName=${video}`, { headers: { Authorization: `Bearer ${token}` } })));
            yield Promise.all(vivaVideos.map((video, index) => {
                const filePath = path_1.default.join(randomVideos, "..", "VIVA", video);
                if (!fs_1.default.existsSync(filePath)) {
                    throw new AppError_1.AppError("File does not exist: " + filePath, 404);
                }
                const buffer = fs_1.default.readFileSync(filePath);
                return axios_1.default.put(signedUrlsToUploadVivaVideos[index].data.data.url, buffer, {
                    headers: {
                        "Content-Type": mime_types_1.default.lookup(video) || "application/octet-stream",
                    },
                });
            }));
        }
        if (fs_1.default.existsSync(randomVideos)) {
            const videos = yield fs_1.default.promises.readdir(randomVideos);
            const signedUrlsToUploadRandomVideos = yield Promise.all(videos.map((video) => axios_1.default.get(`${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=video&fileName=${video}`, { headers: { Authorization: `Bearer ${token}` } })));
            yield Promise.all(videos.map((video, index) => {
                const filePath = path_1.default.join(randomVideos, video);
                if (fs_1.default.existsSync(filePath)) {
                    const buffer = fs_1.default.readFileSync(filePath);
                    return axios_1.default.put(signedUrlsToUploadRandomVideos[index].data.data.url, buffer, {
                        headers: {
                            "Content-Type": mime_types_1.default.lookup(video) || "application/octet-stream",
                        },
                    });
                }
            }));
        }
        let adharName = "";
        let selfieName = "";
        let adharContentType = "";
        let selfieContentType = "";
        if (fs_1.default.existsSync(path_1.default.join(randomPhotos, "..", "..", "adhar"))) {
            const adhar = yield fs_1.default.promises.readdir(path_1.default.join(randomPhotos, "..", "..", "adhar"));
            if (adhar.length === 0) {
                console.log("No files in folder");
            }
            else {
                adharName = adhar[0];
                console.log("adharName", adharName);
                adharContentType = mime_types_1.default.lookup(adharName) || "application/octet-stream";
            }
        }
        if (fs_1.default.existsSync(path_1.default.join(randomPhotos, "..", "..", "selfie"))) {
            const selfie = yield fs_1.default.promises.readdir(path_1.default.join(randomPhotos, "..", "..", "selfie"));
            if (selfie.length === 0) {
                console.log("No files in folder");
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
                console.log("buffer", buffer);
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
        const theoryResponses = yield prisma.examResponse.findMany({
            where: {
                candidateId,
                type: "THEORY",
            },
        });
        const practicalResponses = yield prisma.examResponse.findMany({
            where: {
                candidateId,
                type: "PRACTICAL",
            },
        });
        const vivaResponses = yield prisma.examResponse.findMany({
            where: { candidateId, type: "VIVA" },
        });
        const finalResponses = {
            assessorDetails: {},
            candidateDetails: {
                isEvidanceUploaded: candidate === null || candidate === void 0 ? void 0 : candidate.isEvidanceUploaded,
                isPresentInTheory: candidate === null || candidate === void 0 ? void 0 : candidate.isPresentInTheory,
                isPresentInPractical: candidate === null || candidate === void 0 ? void 0 : candidate.isPresentInPractical,
                isPresentInViva: candidate === null || candidate === void 0 ? void 0 : candidate.isPresentInViva,
                theoryExamStatus: candidate === null || candidate === void 0 ? void 0 : candidate.theoryExamStatus,
                practicalExamStatus: candidate === null || candidate === void 0 ? void 0 : candidate.practicalExamStatus,
                vivaExamStatus: candidate === null || candidate === void 0 ? void 0 : candidate.vivaExamStatus,
                theoryStartedAt: candidate === null || candidate === void 0 ? void 0 : candidate.theoryStartedAt,
                theorySubmittedAt: candidate === null || candidate === void 0 ? void 0 : candidate.theoryStartedAt,
                practicalStartedAt: candidate === null || candidate === void 0 ? void 0 : candidate.theorySubmittedAt,
                practicalSubmittedAt: candidate === null || candidate === void 0 ? void 0 : candidate.practicalSubmittedAt,
                faceHiddenCount: candidate === null || candidate === void 0 ? void 0 : candidate.faceHiddenCount,
                tabSwitchCount: candidate === null || candidate === void 0 ? void 0 : candidate.tabSwitchCount,
                exitFullScreenCount: candidate === null || candidate === void 0 ? void 0 : candidate.exitFullScreenCount,
                multipleFaceDetectionCount: candidate === null || candidate === void 0 ? void 0 : candidate.multipleFaceDetectionCount,
                candidateSelfieCoordinates: (candidate === null || candidate === void 0 ? void 0 : candidate.candidateSelfieCoordinates)
                    ? // @ts-ignore
                        JSON.parse(candidate === null || candidate === void 0 ? void 0 : candidate.candidateSelfieCoordinates)
                    : {},
                candidateSelfieTakenAt: candidate === null || candidate === void 0 ? void 0 : candidate.candidateSelfieTakenAt,
                adharcardPicture: signedUrlsToUploadAdharSelfie.data.data.adhar.location,
                candidateSelfie: signedUrlsToUploadAdharSelfie.data.data.selfie.location,
            },
            theory: [],
            practical: [],
            viva: [],
        };
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
            console.log("practical response = ", response);
            const obj = {
                questionId: response.questionId,
            };
            // @ts-ignore
            if (candidate === null || candidate === void 0 ? void 0 : candidate.batch.isPracticalVisibleToCandidate) {
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
            isAssessorReached: candidate === null || candidate === void 0 ? void 0 : candidate.batch.isAssessorReached,
            assessorReachedAt: candidate === null || candidate === void 0 ? void 0 : candidate.batch.assessorReachedAt,
            assessorCoordinates: (candidate === null || candidate === void 0 ? void 0 : candidate.batch.assessorCoordinates)
                ? // @ts-ignore
                    JSON.parse(candidate === null || candidate === void 0 ? void 0 : candidate.batch.assessorCoordinates)
                : {},
            assessorGroupPhoto: "",
        };
        if (candidate === null || candidate === void 0 ? void 0 : candidate.batch.isAssessorEvidenceRequired) {
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
        console.log("error", error);
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                // console.log("error.response?.data", error.response?.data);
                throw new AppError_1.AppError("resource not found", 404);
            }
            if (((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) === 400) {
                throw new AppError_1.AppError(error.response.data.message || "something went wrong", 400);
            }
        }
    }
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
};
