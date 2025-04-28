-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_exam_response" (
    "candidateId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'THEORY',
    "marksObtained" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("questionId", "answerId", "candidateId", "startedAt", "endedAt"),
    CONSTRAINT "exam_response_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "exam_response_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_exam_response" ("answerId", "batchId", "candidateId", "endedAt", "questionId", "startedAt", "type") SELECT "answerId", "batchId", "candidateId", "endedAt", "questionId", "startedAt", "type" FROM "exam_response";
DROP TABLE "exam_response";
ALTER TABLE "new_exam_response" RENAME TO "exam_response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
