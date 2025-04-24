-- AlterTable
ALTER TABLE "candidates" ADD COLUMN "adharPicture" TEXT;
ALTER TABLE "candidates" ADD COLUMN "candidateSelfie" TEXT;
ALTER TABLE "candidates" ADD COLUMN "candidateSelfieCoordinates" TEXT;
ALTER TABLE "candidates" ADD COLUMN "candidateSelfieTakenAt" DATETIME;
ALTER TABLE "candidates" ADD COLUMN "resetedAt" DATETIME;
ALTER TABLE "candidates" ADD COLUMN "theoryStartedAt" DATETIME;
ALTER TABLE "candidates" ADD COLUMN "theorySubmittedAt" DATETIME;
