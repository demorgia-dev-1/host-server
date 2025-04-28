import { UploadedFile } from "express-fileupload";
import { PrismaClient } from "../../generated/prisma";
import { SubmitTheoryResponses } from "../schemas/candidate.schema";
import { AppError } from "../utils/AppError";
import path from "path";

const prisma = new PrismaClient();
const uploadOnboardingEvidence = async (
  candidateId: string,
  location: { long: number; lat: number },
  adhar: UploadedFile,
  selfie: UploadedFile
) => {
  const candidate = await prisma.candidate.findFirst({
    where: { id: candidateId },
    select: { batch: true, isPresentInTheory: true },
  });
  console.log("location", location);
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate.isPresentInTheory) {
    throw new AppError(
      "Your attendance is not marked in theory exam",
      401,
      true
    );
  }
  const updatedCandidateData: any = {
    isEvidanceUploaded: true,
  };
  if (candidate.batch.isCandidateLocationRequired) {
    if (!location) {
      throw new AppError("Location is required", 400);
    }
    location = JSON.parse(location as any);
    if (!location.long || !location.lat) {
      throw new AppError("Location is required", 400);
    }
    updatedCandidateData["candidateSelfieCoordinates"] = JSON.stringify({
      lat: location.lat,
      long: location.long,
    });
  }
  if (candidate.batch.isCandidateAdharRequired) {
    if (!adhar) {
      throw new AppError("Adhar is required", 400);
    }
    const ext = path.extname(adhar.name);
    const adharPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "evidences",
      "candidates",
      candidateId,
      "adhar",
      `adhar${ext}`
    );
    if (!adhar.mimetype.startsWith("image/")) {
      throw new AppError("Invalid file type", 400);
    }
    if (adhar.size > 2 * 1024 * 1024) {
      throw new AppError("File size exceeds 2MB", 400);
    }
    await adhar.mv(adharPath);
    updatedCandidateData["adharPicture"] = adharPath;
  }
  if (candidate.batch.isCandidateSelfieRequired) {
    if (!selfie) {
      throw new AppError("Selfie is required", 400);
    }
    const ext = path.extname(selfie.name);
    const selfiePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "evidences",
      "candidates",
      candidateId,
      "selfie",
      `selfie${ext}`
    );
    if (!selfie.mimetype.startsWith("image/")) {
      throw new AppError("Invalid file type", 400);
    }
    if (selfie.size > 2 * 1024 * 1024) {
      throw new AppError("File size exceeds 2MB", 400);
    }

    await selfie.mv(selfiePath);
    updatedCandidateData["candidateSelfie"] = selfiePath;
    updatedCandidateData["candidateSelfieTakenAt"] = new Date();
  }
  await prisma.candidate.update({
    where: { id: candidateId },
    data: updatedCandidateData,
  });
};
const getMyTheoryTest = async (candidateId: string) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
    },
    select: {
      batch: true,
      isPresentInTheory: true,
      theoryExamStatus: true,
      isEvidanceUploaded: true,
    },
  });
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate.isEvidanceUploaded) {
    throw new AppError("Your evidence is not uploaded", 401, true);
  }
  if (candidate.theoryExamStatus !== "notStarted") {
    const msg =
      candidate.theoryExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is already started";
    throw new AppError(msg, 401, true);
  }

  const questionBank = JSON.parse(candidate.batch.theoryQuestionBank);
  if (!questionBank) {
    throw new AppError("Question bank not found", 404);
  }
  await prisma.candidate.update({
    where: { id: candidateId },
    data: {
      theoryExamStatus: "started",
    },
  });
  return questionBank;
};
const submitTheoryResponses = async (
  responses: SubmitTheoryResponses,
  candidateId: string,
  batchId: string
) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
      batchId: batchId,
    },
    select: {
      isPresentInTheory: true,
      theoryExamStatus: true,
    },
  });
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate.isPresentInTheory) {
    throw new AppError(
      "Your attendance is not marked in theory exam",
      401,
      true
    );
  }
  if (candidate.theoryExamStatus !== "started") {
    const msg =
      candidate.theoryExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is not started";
    throw new AppError(msg, 401, true);
  }
  if (responses.responses.length === 0) {
    throw new AppError("No responses found", 400);
  }
  const values = responses.responses.map((response) => {
    return `('${response.questionId}', '${response.answerId}','${batchId}', '${candidateId}','${response.startedAt}', '${response.endedAt}', 'THEORY')`;
  });
  const query = `
    INSERT OR REPLACE INTO exam_response 
    (questionId, answerId, batchId, candidateId, startedAt, endedAt,type) 
    VALUES ${values}
  `;
  await prisma.$executeRawUnsafe(query);
};
const uploadRandomVideo = async (
  candidateId: string,
  video: UploadedFile,
  batchId: string,
  testType: "THEORY" | "PRACTICAL" | "VIVA"
) => {
  const batch = await prisma.batch.findFirst({
    where: {
      id: batchId,
    },
    select: {
      isCandidateVideoRequired: true,
    },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.isCandidateVideoRequired) {
    throw new AppError("Video upload is not required for this batch", 400);
  }
  if (!video) {
    throw new AppError("Video is required", 400);
  }
  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
      batchId: batchId,
    },
    select: {
      isPresentInTheory: true,
      isPresentInPractical: true,
      theoryExamStatus: true,
      practicalExamStatus: true,
    },
  });
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (testType === "THEORY" && !candidate.isPresentInTheory) {
    throw new AppError("Your attendance is not marked in theory exam", 401);
  }
  if (testType === "PRACTICAL" && !candidate.isPresentInPractical) {
    throw new AppError("Your attendance is not marked in practical exam", 401);
  }
  if (
    testType === "THEORY" &&
    (candidate.theoryExamStatus === "notStarted" ||
      candidate.theoryExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }
  if (
    testType === "PRACTICAL" &&
    (candidate.practicalExamStatus === "notStarted" ||
      candidate.practicalExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }
  const ext = path.extname(video.name);
  const videoPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    "evidences",
    "candidates",
    candidateId,
    "videos",
    testType,
    `${Date.now()}${ext}`
  );
  if (!video.mimetype.startsWith("video/")) {
    throw new AppError("Invalid file type", 400);
  }
  if (video.size > 10 * 1024 * 1024) {
    throw new AppError("File size exceeds 10MB", 400);
  }
  await video.mv(videoPath);
};
const uploadRandomPhoto = async (
  candidateId: string,
  photo: UploadedFile,
  batchId: string,
  testType: "THEORY" | "PRACTICAL" | "VIVA"
) => {
  const batch = await prisma.batch.findFirst({
    where: {
      id: batchId,
    },
    select: {
      isCandidatePhotosRequired: true,
    },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.isCandidatePhotosRequired) {
    throw new AppError("Video upload is not required for this batch", 400);
  }
  if (!photo) {
    throw new AppError("Photo is required", 400);
  }
  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
      batchId: batchId,
    },
    select: {
      isPresentInTheory: true,
      isPresentInPractical: true,
      theoryExamStatus: true,
      practicalExamStatus: true,
    },
  });
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (testType === "THEORY" && !candidate.isPresentInTheory) {
    throw new AppError("Your attendance is not marked in theory exam", 401);
  }
  if (testType === "PRACTICAL" && !candidate.isPresentInPractical) {
    throw new AppError("Your attendance is not marked in practical exam", 401);
  }
  if (
    testType === "THEORY" &&
    (candidate.theoryExamStatus === "notStarted" ||
      candidate.theoryExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }
  if (
    testType === "PRACTICAL" &&
    (candidate.practicalExamStatus === "notStarted" ||
      candidate.practicalExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }

  const ext = path.extname(photo.name);
  const photoPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    "evidences",
    "candidates",
    candidateId,
    "photos",
    testType,
    `${Date.now()}${ext}`
  );
  if (!photo.mimetype.startsWith("image/")) {
    throw new AppError("Invalid file type", 400);
  }
  if (photo.size > 2 * 1024 * 1024) {
    throw new AppError("File size exceeds 2MB", 400);
  }
  await photo.mv(photoPath);
};

export default {
  getMyTheoryTest,
  submitTheoryResponses,
  uploadOnboardingEvidence,
  uploadRandomVideo,
  uploadRandomPhoto,
};
