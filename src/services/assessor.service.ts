import axios from "axios";
import path from "path";
import { AppError } from "../utils/AppError";
import { PrismaClient } from "../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { UploadedFile } from "express-fileupload";
const prisma = new PrismaClient();
const getAssignedBatches = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.MAIN_SERVER_URL}/assessor/offline-batches`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }
    throw new AppError("internal server error", 500);
  }
};
const saveBatchOffline = async (token: string, batchId: string) => {
  try {
    const response = await axios.get(
      `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const {
      batch,
      theoryQuestionBank,
      practicalQuestionBank,
      vivaQuestionBank,
      candidates,
    } = response.data.data;

    await prisma.$transaction([
      prisma.batch.create({
        data: {
          id: batch._id,
          assessor: batch.assessor,
          name: batch.name,
          type: batch.type,
          status: batch.status,
          noOfCandidates: batch.noOfCandidates,
          durationInMin: batch.durationInMin,
          no: batch.no,
          startDate: batch.startDate,
          endDate: batch.endDate,
          theoryQuestionBank: JSON.stringify(theoryQuestionBank),
          practicalQuestionBank: JSON.stringify(practicalQuestionBank),
          vivaQuestionBank: JSON.stringify(vivaQuestionBank),
          isAssessorReached: false,
          isCandidateVideoRequired: batch.isCandidateVideoRequired,
          isCandidatePhotosRequired: batch.isCandidatePhotosRequired,
          isCandidateLocationRequired: batch.isCandidateLocationRequired,
          isCandidateAdharRequired: batch.isCandidateAdharRequired,
          isCandidateSelfieRequired: batch.isCandidateSelfieRequired,
          isPracticalVisibleToCandidate: batch.isPracticalVisibleToCandidate,
          isSuspiciousActivityDetectionRequired:
            batch.isSuspiciousActivityDetectionRequired,
          isAssessorEvidenceRequired: batch.isAssessorEvidenceRequired,
          assessorReachedAt: null,
          assessorCoordinates: null,
          assessorGroupPhoto: null,
        },
      }),
      prisma.candidate.createMany({
        data: candidates.docs.map((candidate: any) => ({
          id: candidate._id,
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          address: candidate.address,
          batchId: candidate.batch,
          fatherName: candidate.fatherName,
          enrollmentNo: candidate.enrollmentNo,
          isActive: candidate.isActive,
          password: candidate.password,
          gender: candidate.gender,
          adharNo: candidate.adharNo,
          isTheoryStarted: false,
          isEvidanceUploaded: false,
          isPresentInTheory: false,
          isPresentInPractical: false,
          isPresentInViva: false,
          isTheorySubmitted: false,
          theoryExamStatus: "notStarted",
          practicalExamStatus: "notStarted",
          vivaExamStatus: "notStarted",
          multipleFaceDetectionCount: 0,
          faceHiddenCount: 0,
          tabSwitchCount: 0,
          exitFullScreenCount: 0,
        })),
      }),
    ]);
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2011") {
        throw new AppError(
          `Null constraint violation on field: ${error.meta?.constraint}`,
          400
        );
      }
      if (error.code === "P2002") {
        throw new AppError(
          `Unique constraint violation on field: ${error.meta?.target}`,
          400
        );
      }
    }
    throw new AppError("internal server error", 500);
  }
};
const getLoadedBatches = async (assessorId: string) => {
  try {
    console.log("assessorId", assessorId);
    const batches = await prisma.batch.findMany({
      where: { assessor: assessorId },
    });
    return batches;
  } catch (error) {
    throw new AppError("internal server error", 500);
  }
};
const getCandidateList = async (batchId: string, assessorId: string) => {
  const batch = await prisma.batch.findFirst({
    where: { id: batchId, assessor: assessorId },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  return await prisma.candidate.findMany({
    where: {
      batchId: batchId,
    },
  });
};
const markAttendanceInTheory = async (
  candidates: string[],
  batchId: string,
  assessorId: string
) => {
  try {
    const batch = await prisma.batch.findFirst({
      where: { id: batchId, assessor: assessorId },
    });
    if (!batch) {
      throw new AppError("Batch not found", 404);
    }
    if (!batch.isAssessorReached) {
      throw new AppError("mark yourself as reached", 400);
    }
    const updatedCandidates = await prisma.candidate.updateMany({
      where: {
        id: { in: candidates },
        batchId: batchId,
      },
      data: {
        isPresentInTheory: true,
      },
    });
    return updatedCandidates;
  } catch (error) {
    throw new AppError("internal server error", 500);
  }
};
const resetCandidates = async (
  candidateIds: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await prisma.batch.findFirst({
    where: { id: batchId, assessor: assessorId },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  await prisma.candidate.updateMany({
    where: {
      id: { in: candidateIds },
      batchId: batchId,
    },
    data: {
      isPresentInTheory: false,
      isPresentInPractical: false,
      isPresentInViva: false,
      isTheorySubmitted: false,
      theoryExamStatus: "notStarted",
      practicalExamStatus: "notStarted",
      vivaExamStatus: "notStarted",
    },
  });
};
const markAssessorAsReached = async (
  batchId: string,
  assessorId: string,
  picture?: UploadedFile,
  location?: { lat: number; long: number }
) => {
  const batch = await prisma.batch.findFirst({
    where: {
      id: batchId,
      assessor: assessorId,
    },
    select: {
      isAssessorEvidenceRequired: true,
      isAssessorReached: true,
    },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (batch.isAssessorReached) {
    throw new AppError("Assessor already reached", 400);
  }
  if (!batch.isAssessorEvidenceRequired) {
    await prisma.batch.update({
      where: {
        id: batchId,
      },
      data: {
        isAssessorReached: true,
        assessorReachedAt: new Date(),
        assessorCoordinates: null,
        assessorGroupPhoto: null,
      },
    });
    return;
  }
  if (!picture) {
    throw new AppError("Assessor evidence is required", 400);
  }
  if (!location) {
    throw new AppError("Assessor location is required", 400);
  }
  if (!picture.mimetype.startsWith("image/")) {
    throw new AppError("Invalid file type", 400);
  }
  if (picture.size > 2 * 1024 * 1024) {
    throw new AppError("File size exceeds 2MB", 400);
  }
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    `${Date.now()}_${picture.name}`
  );
  const p = await new Promise((resolve, reject) => {
    picture.mv(uploadPath, (err) => {
      if (err) {
        reject(new AppError("Error uploading file", 500));
      } else {
        resolve(uploadPath);
      }
    });
  });
  await prisma.batch.update({
    where: {
      id: batchId,
    },
    data: {
      isAssessorReached: true,
      assessorReachedAt: new Date(),
      assessorCoordinates: JSON.stringify(location),
      assessorGroupPhoto: p as string,
    },
  });
};
const startBatch = async (batchId: string, assessorId: string) => {
  const batch = await prisma.batch.findFirst({
    where: {
      id: batchId,
      assessor: assessorId,
    },
    select: {
      isAssessorEvidenceRequired: true,
      isAssessorReached: true,
    },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  await prisma.batch.update({
    where: {
      id: batchId,
    },
    data: {
      status: "started",
    },
  });
};
export default {
  getAssignedBatches,
  saveBatchOffline,
  getLoadedBatches,
  markAttendanceInTheory,
  getCandidateList,
  resetCandidates,
  markAssessorAsReached,
  startBatch,
};
