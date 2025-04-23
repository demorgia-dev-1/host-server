-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_batches" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "assessor" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "noOfCandidates" INTEGER NOT NULL,
    "durationInMin" INTEGER NOT NULL,
    "no" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "theoryQuestionBank" TEXT NOT NULL,
    "practicalQuestionBank" TEXT NOT NULL,
    "vivaQuestionBank" TEXT NOT NULL,
    "isAssessorReached" BOOLEAN NOT NULL,
    "isCandidateVideoRequired" BOOLEAN NOT NULL,
    "isCandidatePhotosRequired" BOOLEAN NOT NULL,
    "isCandidateLocationRequired" BOOLEAN NOT NULL,
    "isCandidateAdharRequired" BOOLEAN NOT NULL,
    "isCandidateSelfieRequired" BOOLEAN NOT NULL,
    "isPracticalVisibleToCandidate" BOOLEAN NOT NULL,
    "isSuspiciousActivityDetectionRequired" BOOLEAN NOT NULL,
    "isAssessorEvidenceRequired" BOOLEAN NOT NULL,
    "assessorReachedAt" DATETIME,
    "assessorCoordinates" TEXT,
    "assessorGroupPhoto" TEXT
);
INSERT INTO "new_batches" ("_id", "assessor", "assessorCoordinates", "assessorGroupPhoto", "assessorReachedAt", "durationInMin", "endDate", "isAssessorEvidenceRequired", "isAssessorReached", "isCandidateAdharRequired", "isCandidateLocationRequired", "isCandidatePhotosRequired", "isCandidateSelfieRequired", "isCandidateVideoRequired", "isPracticalVisibleToCandidate", "isSuspiciousActivityDetectionRequired", "name", "no", "noOfCandidates", "practicalQuestionBank", "startDate", "status", "theoryQuestionBank", "type", "vivaQuestionBank") SELECT "_id", "assessor", "assessorCoordinates", "assessorGroupPhoto", "assessorReachedAt", "durationInMin", "endDate", "isAssessorEvidenceRequired", "isAssessorReached", "isCandidateAdharRequired", "isCandidateLocationRequired", "isCandidatePhotosRequired", "isCandidateSelfieRequired", "isCandidateVideoRequired", "isPracticalVisibleToCandidate", "isSuspiciousActivityDetectionRequired", "name", "no", "noOfCandidates", "practicalQuestionBank", "startDate", "status", "theoryQuestionBank", "type", "vivaQuestionBank" FROM "batches";
DROP TABLE "batches";
ALTER TABLE "new_batches" RENAME TO "batches";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
