-- CreateTable
CREATE TABLE "practical_exam_response" (
    "candidateId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "marksObtained" INTEGER,

    PRIMARY KEY ("questionId", "answerId", "candidateId", "startedAt", "endedAt"),
    CONSTRAINT "practical_exam_response_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "practical_exam_response_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
