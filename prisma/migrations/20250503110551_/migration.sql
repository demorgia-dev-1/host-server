/*
  Warnings:

  - The primary key for the `exam_response` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_candidates" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "batchId" TEXT NOT NULL,
    "fatherName" TEXT,
    "enrollmentNo" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT,
    "adharNo" TEXT,
    "isTheoryStarted" BOOLEAN NOT NULL,
    "isEvidanceUploaded" BOOLEAN NOT NULL,
    "isPresentInTheory" BOOLEAN NOT NULL,
    "isPresentInPractical" BOOLEAN NOT NULL,
    "isPresentInViva" BOOLEAN NOT NULL,
    "isTheorySubmitted" BOOLEAN NOT NULL,
    "theoryExamStatus" TEXT NOT NULL,
    "practicalExamStatus" TEXT NOT NULL,
    "vivaExamStatus" TEXT NOT NULL,
    "multipleFaceDetectionCount" INTEGER NOT NULL,
    "faceHiddenCount" INTEGER NOT NULL,
    "tabSwitchCount" INTEGER NOT NULL,
    "exitFullScreenCount" INTEGER NOT NULL,
    "theoryStartedAt" DATETIME,
    "theorySubmittedAt" DATETIME,
    "candidateSelfieCoordinates" TEXT,
    "candidateSelfieTakenAt" DATETIME,
    "candidateSelfie" TEXT,
    "adharPicture" TEXT,
    "resetedAt" DATETIME,
    "practicalStartedAt" DATETIME,
    "practicalSubmittedAt" DATETIME,
    CONSTRAINT "candidates_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_candidates" ("_id", "address", "adharNo", "adharPicture", "batchId", "candidateSelfie", "candidateSelfieCoordinates", "candidateSelfieTakenAt", "email", "enrollmentNo", "exitFullScreenCount", "faceHiddenCount", "fatherName", "gender", "isActive", "isEvidanceUploaded", "isPresentInPractical", "isPresentInTheory", "isPresentInViva", "isTheoryStarted", "isTheorySubmitted", "multipleFaceDetectionCount", "name", "password", "phone", "practicalExamStatus", "practicalStartedAt", "practicalSubmittedAt", "resetedAt", "tabSwitchCount", "theoryExamStatus", "theoryStartedAt", "theorySubmittedAt", "vivaExamStatus") SELECT "_id", "address", "adharNo", "adharPicture", "batchId", "candidateSelfie", "candidateSelfieCoordinates", "candidateSelfieTakenAt", "email", "enrollmentNo", "exitFullScreenCount", "faceHiddenCount", "fatherName", "gender", "isActive", "isEvidanceUploaded", "isPresentInPractical", "isPresentInTheory", "isPresentInViva", "isTheoryStarted", "isTheorySubmitted", "multipleFaceDetectionCount", "name", "password", "phone", "practicalExamStatus", "practicalStartedAt", "practicalSubmittedAt", "resetedAt", "tabSwitchCount", "theoryExamStatus", "theoryStartedAt", "theorySubmittedAt", "vivaExamStatus" FROM "candidates";
DROP TABLE "candidates";
ALTER TABLE "new_candidates" RENAME TO "candidates";
CREATE TABLE "new_exam_response" (
    "candidateId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'THEORY',
    "marksObtained" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("questionId", "candidateId"),
    CONSTRAINT "exam_response_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "exam_response_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_exam_response" ("answerId", "batchId", "candidateId", "endedAt", "marksObtained", "questionId", "startedAt", "type") SELECT "answerId", "batchId", "candidateId", "endedAt", "marksObtained", "questionId", "startedAt", "type" FROM "exam_response";
DROP TABLE "exam_response";
ALTER TABLE "new_exam_response" RENAME TO "exam_response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
