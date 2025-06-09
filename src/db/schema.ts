import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  unique,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/gel-core";

// Enums
export const examTypeEnum = ["THEORY", "PRACTICAL", "VIVA"] as const;

export const batches = sqliteTable("batches", {
  id: text("_id").primaryKey(),
  assessor: text("assessor").notNull(),
  name: text("name"),
  type: text("type").notNull(),
  status: text("status").notNull(),
  noOfCandidates: integer("noOfCandidates").notNull(),
  durationInMin: integer("durationInMin").notNull(),
  no: text("no").notNull(),
  startDate: text("startDate").notNull(), // ISO date as string
  endDate: text("endDate").notNull(),
  theoryQuestionBank: text("theoryQuestionBank"),
  practicalQuestionBank: text("practicalQuestionBank"),
  vivaQuestionBank: text("vivaQuestionBank"),
  pmkyChecklist: text("pmkyChecklist"),
  isAssessorReached: integer("isAssessorReached", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isCandidateVideoRequired: integer("isCandidateVideoRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isCandidatePhotosRequired: integer("isCandidatePhotosRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isCandidateLocationRequired: integer("isCandidateLocationRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isCandidateAdharRequired: integer("isCandidateAdharRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isCandidateSelfieRequired: integer("isCandidateSelfieRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isPracticalVisibleToCandidate: integer("isPracticalVisibleToCandidate", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  isSuspiciousActivityDetectionRequired: integer(
    "isSuspiciousActivityDetectionRequired",
    { mode: "boolean" }
  )
    .notNull()
    .default(false),
  isAssessorEvidenceRequired: integer("isAssessorEvidenceRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),

  assessorReachedAt: text("assessorReachedAt"),
  assessorCoordinates: text("assessorCoordinates"),
  assessorGroupPhoto: text("assessorGroupPhoto"),
  isPmkyCheckListRequired: integer("isPmkyCheckListRequired", {
    mode: "boolean",
  })
    .notNull()
    .default(false),
  sscLogo: text("sscLogo"),
  jobRole: text("jobRole"),
});

export const candidates = sqliteTable("candidates", {
  id: text("_id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  batchId: text("batchId")
    .notNull()
    .references(() => batches.id, { onDelete: "cascade" })
    .notNull(),
  fatherName: text("fatherName"),
  enrollmentNo: text("enrollmentNo").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).notNull().default(true),
  password: text("password").notNull(),
  gender: text("gender"),
  adharNo: text("adharNo"),
  isTheoryStarted: integer("isTheoryStarted", { mode: "boolean" }).notNull(),
  isEvidenceUploaded: integer("isEvidenceUploaded", {
    mode: "boolean",
  }).notNull(),
  isPresentInTheory: integer("isPresentInTheory", {
    mode: "boolean",
  }).notNull(),
  isPresentInPractical: integer("isPresentInPractical", {
    mode: "boolean",
  }).notNull(),
  isPresentInViva: integer("isPresentInViva", { mode: "boolean" }).notNull(),
  isTheorySubmitted: integer("isTheorySubmitted", {
    mode: "boolean",
  }).notNull(),

  theoryExamStatus: text("theoryExamStatus").notNull(),
  practicalExamStatus: text("practicalExamStatus").notNull(),
  vivaExamStatus: text("vivaExamStatus").notNull(),

  multipleFaceDetectionCount: integer("multipleFaceDetectionCount").notNull(),
  faceHiddenCount: integer("faceHiddenCount").notNull(),
  tabSwitchCount: integer("tabSwitchCount").notNull(),
  exitFullScreenCount: integer("exitFullScreenCount").notNull(),

  theoryStartedAt: text("theoryStartedAt"),
  theorySubmittedAt: text("theorySubmittedAt"),

  candidateSelfieCoordinates: text("candidateSelfieCoordinates"),
  candidateSelfieTakenAt: text("candidateSelfieTakenAt"),
  candidateSelfie: text("candidateSelfie"),
  adharPicture: text("adharPicture"),
  resetedAt: text("resetedAt"),
  practicalStartedAt: text("practicalStartedAt"),
  practicalSubmittedAt: text("practicalSubmittedAt"),
});

export const examResponses = sqliteTable(
  "exam_response",
  {
    candidateId: text("candidateId")
      .notNull()
      .references(() => candidates.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    batchId: text("batchId")
      .notNull()
      .references(() => batches.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    questionId: text("questionId").notNull(),
    answerId: text("answerId").notNull(),
    startedAt: text("startedAt").notNull(),
    endedAt: text("endedAt").notNull(),
    type: text("type", { enum: examTypeEnum }).notNull().default("THEORY"),
    marksObtained: integer("marksObtained").notNull().default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.questionId, table.candidateId] }),
  })
);

export const comments = sqliteTable(
  "comments",
  {
    batchId: text("batchId")
      .notNull()
      .references(() => batches.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    candidateId: text("candidateId")
      .notNull()
      .references(() => candidates.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    comment: text("comment").notNull(),
    testType: text("testType", { enum: examTypeEnum }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.batchId, table.candidateId] }),
  })
);

export const candidateFeedback = sqliteTable("candidate_feedback", {
  id: text("_id").primaryKey(),
  batchId: text("batch")
    .notNull()
    .references(() => batches.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  candidateId: text("candidate")
    .notNull()
    .references(() => candidates.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  questions: text("questions").notNull(),
  submitted: integer("submitted", { mode: "boolean" }).notNull().default(false),
});

// Relations
export const candidateRelations = relations(candidates, ({ one, many }) => ({
  batch: one(batches, {
    fields: [candidates.batchId],
    references: [batches.id],
  }),
  examResponses: many(examResponses),
}));

export const batchRelations = relations(batches, ({ many }) => ({
  candidates: many(candidates),
  examResponses: many(examResponses),
}));

export const examResponseRelations = relations(examResponses, ({ one }) => ({
  candidate: one(candidates, {
    fields: [examResponses.candidateId],
    references: [candidates.id],
  }),
  batch: one(batches, {
    fields: [examResponses.batchId],
    references: [batches.id],
  }),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  candidate: one(candidates, {
    fields: [comments.candidateId],
    references: [candidates.id],
  }),
  batch: one(batches, {
    fields: [comments.batchId],
    references: [batches.id],
  }),
}));

export const candidateFeedbackRelations = relations(
  candidateFeedback,
  ({ one }) => ({
    candidate: one(candidates, {
      fields: [candidateFeedback.candidateId],
      references: [candidates.id],
    }),
    batch: one(batches, {
      fields: [candidateFeedback.batchId],
      references: [batches.id],
    }),
  })
);
