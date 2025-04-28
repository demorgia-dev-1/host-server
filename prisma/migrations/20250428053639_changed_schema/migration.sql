/*
  Warnings:

  - You are about to drop the `theory_exam_response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "theory_exam_response";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "exam_response" (
    "candidateId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'THEORY',

    PRIMARY KEY ("questionId", "answerId", "candidateId", "startedAt", "endedAt"),
    CONSTRAINT "exam_response_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "exam_response_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
