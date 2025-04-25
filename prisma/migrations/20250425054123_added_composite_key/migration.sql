/*
  Warnings:

  - The primary key for the `theory_exam_response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `theory_exam_response` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_theory_exam_response" (
    "candidateId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,

    PRIMARY KEY ("questionId", "answerId", "candidateId", "startedAt", "endedAt"),
    CONSTRAINT "theory_exam_response_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "theory_exam_response_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_theory_exam_response" ("answerId", "batchId", "candidateId", "endedAt", "questionId", "startedAt") SELECT "answerId", "batchId", "candidateId", "endedAt", "questionId", "startedAt" FROM "theory_exam_response";
DROP TABLE "theory_exam_response";
ALTER TABLE "new_theory_exam_response" RENAME TO "theory_exam_response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
