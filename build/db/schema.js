"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateFeedbackRelations = exports.commentRelations = exports.examResponseRelations = exports.batchRelations = exports.candidateRelations = exports.candidateFeedback = exports.comments = exports.examResponses = exports.candidates = exports.batches = exports.examTypeEnum = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enums
exports.examTypeEnum = ["THEORY", "PRACTICAL", "VIVA"];
exports.batches = (0, sqlite_core_1.sqliteTable)("batches", {
    id: (0, sqlite_core_1.text)("_id").primaryKey(),
    assessor: (0, sqlite_core_1.text)("assessor").notNull(),
    name: (0, sqlite_core_1.text)("name"),
    type: (0, sqlite_core_1.text)("type").notNull(),
    status: (0, sqlite_core_1.text)("status").notNull(),
    noOfCandidates: (0, sqlite_core_1.integer)("noOfCandidates").notNull(),
    durationInMin: (0, sqlite_core_1.integer)("durationInMin").notNull(),
    no: (0, sqlite_core_1.text)("no").notNull(),
    startDate: (0, sqlite_core_1.text)("startDate").notNull(), // ISO date as string
    endDate: (0, sqlite_core_1.text)("endDate").notNull(),
    theoryQuestionBank: (0, sqlite_core_1.text)("theoryQuestionBank"),
    practicalQuestionBank: (0, sqlite_core_1.text)("practicalQuestionBank"),
    vivaQuestionBank: (0, sqlite_core_1.text)("vivaQuestionBank"),
    pmkyChecklist: (0, sqlite_core_1.text)("pmkyChecklist"),
    isAssessorReached: (0, sqlite_core_1.integer)("isAssessorReached", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isCandidateVideoRequired: (0, sqlite_core_1.integer)("isCandidateVideoRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isCandidatePhotosRequired: (0, sqlite_core_1.integer)("isCandidatePhotosRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isCandidateLocationRequired: (0, sqlite_core_1.integer)("isCandidateLocationRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isCandidateAdharRequired: (0, sqlite_core_1.integer)("isCandidateAdharRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isCandidateSelfieRequired: (0, sqlite_core_1.integer)("isCandidateSelfieRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isPracticalVisibleToCandidate: (0, sqlite_core_1.integer)("isPracticalVisibleToCandidate", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    isSuspiciousActivityDetectionRequired: (0, sqlite_core_1.integer)("isSuspiciousActivityDetectionRequired", { mode: "boolean" })
        .notNull()
        .default(false),
    isAssessorEvidenceRequired: (0, sqlite_core_1.integer)("isAssessorEvidenceRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    assessorReachedAt: (0, sqlite_core_1.text)("assessorReachedAt"),
    assessorCoordinates: (0, sqlite_core_1.text)("assessorCoordinates"),
    assessorGroupPhoto: (0, sqlite_core_1.text)("assessorGroupPhoto"),
    isPmkyCheckListRequired: (0, sqlite_core_1.integer)("isPmkyCheckListRequired", {
        mode: "boolean",
    })
        .notNull()
        .default(false),
    sscLogo: (0, sqlite_core_1.text)("sscLogo"),
});
exports.candidates = (0, sqlite_core_1.sqliteTable)("candidates", {
    id: (0, sqlite_core_1.text)("_id").primaryKey(),
    name: (0, sqlite_core_1.text)("name"),
    email: (0, sqlite_core_1.text)("email"),
    phone: (0, sqlite_core_1.text)("phone"),
    address: (0, sqlite_core_1.text)("address"),
    batchId: (0, sqlite_core_1.text)("batchId")
        .notNull()
        .references(() => exports.batches.id, { onDelete: "cascade" })
        .notNull(),
    fatherName: (0, sqlite_core_1.text)("fatherName"),
    enrollmentNo: (0, sqlite_core_1.text)("enrollmentNo").notNull(),
    isActive: (0, sqlite_core_1.integer)("isActive", { mode: "boolean" }).notNull().default(true),
    password: (0, sqlite_core_1.text)("password").notNull(),
    gender: (0, sqlite_core_1.text)("gender"),
    adharNo: (0, sqlite_core_1.text)("adharNo"),
    isTheoryStarted: (0, sqlite_core_1.integer)("isTheoryStarted", { mode: "boolean" }).notNull(),
    isEvidenceUploaded: (0, sqlite_core_1.integer)("isEvidenceUploaded", {
        mode: "boolean",
    }).notNull(),
    isPresentInTheory: (0, sqlite_core_1.integer)("isPresentInTheory", {
        mode: "boolean",
    }).notNull(),
    isPresentInPractical: (0, sqlite_core_1.integer)("isPresentInPractical", {
        mode: "boolean",
    }).notNull(),
    isPresentInViva: (0, sqlite_core_1.integer)("isPresentInViva", { mode: "boolean" }).notNull(),
    isTheorySubmitted: (0, sqlite_core_1.integer)("isTheorySubmitted", {
        mode: "boolean",
    }).notNull(),
    theoryExamStatus: (0, sqlite_core_1.text)("theoryExamStatus").notNull(),
    practicalExamStatus: (0, sqlite_core_1.text)("practicalExamStatus").notNull(),
    vivaExamStatus: (0, sqlite_core_1.text)("vivaExamStatus").notNull(),
    multipleFaceDetectionCount: (0, sqlite_core_1.integer)("multipleFaceDetectionCount").notNull(),
    faceHiddenCount: (0, sqlite_core_1.integer)("faceHiddenCount").notNull(),
    tabSwitchCount: (0, sqlite_core_1.integer)("tabSwitchCount").notNull(),
    exitFullScreenCount: (0, sqlite_core_1.integer)("exitFullScreenCount").notNull(),
    theoryStartedAt: (0, sqlite_core_1.text)("theoryStartedAt"),
    theorySubmittedAt: (0, sqlite_core_1.text)("theorySubmittedAt"),
    candidateSelfieCoordinates: (0, sqlite_core_1.text)("candidateSelfieCoordinates"),
    candidateSelfieTakenAt: (0, sqlite_core_1.text)("candidateSelfieTakenAt"),
    candidateSelfie: (0, sqlite_core_1.text)("candidateSelfie"),
    adharPicture: (0, sqlite_core_1.text)("adharPicture"),
    resetedAt: (0, sqlite_core_1.text)("resetedAt"),
    practicalStartedAt: (0, sqlite_core_1.text)("practicalStartedAt"),
    practicalSubmittedAt: (0, sqlite_core_1.text)("practicalSubmittedAt"),
});
exports.examResponses = (0, sqlite_core_1.sqliteTable)("exam_response", {
    candidateId: (0, sqlite_core_1.text)("candidateId")
        .notNull()
        .references(() => exports.candidates.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    batchId: (0, sqlite_core_1.text)("batchId")
        .notNull()
        .references(() => exports.batches.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    questionId: (0, sqlite_core_1.text)("questionId").notNull(),
    answerId: (0, sqlite_core_1.text)("answerId").notNull(),
    startedAt: (0, sqlite_core_1.text)("startedAt").notNull(),
    endedAt: (0, sqlite_core_1.text)("endedAt").notNull(),
    type: (0, sqlite_core_1.text)("type", { enum: exports.examTypeEnum }).notNull().default("THEORY"),
    marksObtained: (0, sqlite_core_1.integer)("marksObtained").notNull().default(0),
}, (table) => ({
    pk: (0, sqlite_core_1.primaryKey)({ columns: [table.questionId, table.candidateId] }),
}));
exports.comments = (0, sqlite_core_1.sqliteTable)("comments", {
    batchId: (0, sqlite_core_1.text)("batchId")
        .notNull()
        .references(() => exports.batches.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    candidateId: (0, sqlite_core_1.text)("candidateId")
        .notNull()
        .references(() => exports.candidates.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    comment: (0, sqlite_core_1.text)("comment").notNull(),
    testType: (0, sqlite_core_1.text)("testType", { enum: exports.examTypeEnum }).notNull(),
}, (table) => ({
    pk: (0, sqlite_core_1.primaryKey)({ columns: [table.batchId, table.candidateId] }),
}));
exports.candidateFeedback = (0, sqlite_core_1.sqliteTable)("candidate_feedback", {
    id: (0, sqlite_core_1.text)("_id").primaryKey(),
    batchId: (0, sqlite_core_1.text)("batch")
        .notNull()
        .references(() => exports.batches.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    candidateId: (0, sqlite_core_1.text)("candidate")
        .notNull()
        .references(() => exports.candidates.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    questions: (0, sqlite_core_1.text)("questions").notNull(),
    submitted: (0, sqlite_core_1.integer)("submitted", { mode: "boolean" }).notNull().default(false),
});
// Relations
exports.candidateRelations = (0, drizzle_orm_1.relations)(exports.candidates, ({ one, many }) => ({
    batch: one(exports.batches, {
        fields: [exports.candidates.batchId],
        references: [exports.batches.id],
    }),
    examResponses: many(exports.examResponses),
}));
exports.batchRelations = (0, drizzle_orm_1.relations)(exports.batches, ({ many }) => ({
    candidates: many(exports.candidates),
    examResponses: many(exports.examResponses),
}));
exports.examResponseRelations = (0, drizzle_orm_1.relations)(exports.examResponses, ({ one }) => ({
    candidate: one(exports.candidates, {
        fields: [exports.examResponses.candidateId],
        references: [exports.candidates.id],
    }),
    batch: one(exports.batches, {
        fields: [exports.examResponses.batchId],
        references: [exports.batches.id],
    }),
}));
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.comments, ({ one }) => ({
    candidate: one(exports.candidates, {
        fields: [exports.comments.candidateId],
        references: [exports.candidates.id],
    }),
    batch: one(exports.batches, {
        fields: [exports.comments.batchId],
        references: [exports.batches.id],
    }),
}));
exports.candidateFeedbackRelations = (0, drizzle_orm_1.relations)(exports.candidateFeedback, ({ one }) => ({
    candidate: one(exports.candidates, {
        fields: [exports.candidateFeedback.candidateId],
        references: [exports.candidates.id],
    }),
    batch: one(exports.batches, {
        fields: [exports.candidateFeedback.batchId],
        references: [exports.batches.id],
    }),
}));
