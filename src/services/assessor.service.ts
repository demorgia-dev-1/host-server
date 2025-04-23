import axios from "axios";
import { AppError } from "../utils/AppError";
import { PrismaClient } from "../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
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

const getLoadedBatches = async () => {
  try {
    const batches = await prisma.batch.findMany({});
    return batches;
  } catch (error) {
    throw new AppError("internal server error", 500);
  }
};

export default {
  getAssignedBatches,
  saveBatchOffline,
  getLoadedBatches,
};
