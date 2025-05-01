import axios from "axios";
import path from "path";
import fs from "fs";
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
    if (!batch.theoryQuestionBank) {
      throw new AppError("no theory question bank found", 400);
    }
    if (batch.status === "assigned") {
      throw new AppError("Batch is not started yet", 400);
    }
    if (batch.status === "completed") {
      throw new AppError("Batch is already completed", 400);
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
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("internal server error", 500);
  }
};
const markAttendanceInPractical = async (
  candidates: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await prisma.batch.findFirst({
    where: { id: batchId, assessor: assessorId },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.practicalQuestionBank) {
    throw new AppError("no practical question bank found", 400);
  }
  if (batch.status === "assigned") {
    throw new AppError("Batch is not started yet", 400);
  }
  if (batch.status === "completed") {
    throw new AppError("Batch is already completed", 400);
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
      isPresentInPractical: true,
    },
  });
  return updatedCandidates;
};
const markAttendanceInViva = async (
  candidates: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await prisma.batch.findFirst({
    where: { id: batchId, assessor: assessorId },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.vivaQuestionBank) {
    throw new AppError("no viva question bank found", 400);
  }
  if (batch.status === "assigned") {
    throw new AppError("Batch is not started yet", 400);
  }
  if (batch.status === "completed") {
    throw new AppError("Batch is already completed", 400);
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
      isPresentInViva: true,
    },
  });
  return updatedCandidates;
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
  if (batch.status !== "ongoing") {
    throw new AppError("Batch is not ongoing", 400);
  }
  await prisma.$transaction([
    prisma.examResponse.deleteMany({
      where: {
        candidateId: { in: candidateIds },
        batchId: batchId,
        type: "THEORY",
      },
    }),
    prisma.candidate.updateMany({
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
    }),
  ]);
};
const resetCandidatesPractical = async (
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
  if (batch.status !== "ongoing") {
    throw new AppError("Batch is not ongoing", 400);
  }
  await prisma.$transaction([
    prisma.examResponse.deleteMany({
      where: {
        candidateId: { in: candidateIds },
        batchId: batchId,
        type: "PRACTICAL",
      },
    }),
    prisma.candidate.updateMany({
      where: {
        id: { in: candidateIds },
        batchId: batchId,
      },
      data: {
        isPresentInPractical: false,
        practicalExamStatus: "notStarted",
        practicalStartedAt: null,
        practicalSubmittedAt: null,
      },
    }),
  ]);
};
const resetCandidatesViva = async (
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
  if (batch.status !== "ongoing") {
    throw new AppError("Batch is not ongoing", 400);
  }
  await prisma.$transaction([
    prisma.examResponse.deleteMany({
      where: {
        candidateId: { in: candidateIds },
        batchId: batchId,
        type: "VIVA",
      },
    }),
    prisma.candidate.updateMany({
      where: {
        id: { in: candidateIds },
        batchId: batchId,
      },
      data: {
        isPresentInViva: false,
        vivaExamStatus: "notStarted",
      },
    }),
  ]);
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
      status: "ongoing",
    },
  });
};
const deleteBatches = async (ids: string[], assessorId: string) => {
  await prisma.batch.deleteMany({
    where: {
      id: { in: ids },
      assessor: assessorId,
    },
  });
};
const submitCandidatePracticalResponses = async (
  responses: any,
  candidateId: string,
  batchId: string,
  assessorId: string,
  evidence?: UploadedFile
) => {
  const batch = await prisma.batch.findFirst({
    where: { id: batchId, assessor: assessorId },
    select: {
      isPracticalVisibleToCandidate: true,
      practicalQuestionBank: true,
      isAssessorReached: true,
    },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (batch.isPracticalVisibleToCandidate) {
    throw new AppError(
      "Practical is visible to candidate,can't submit practical",
      400
    );
  }
  if (!batch.practicalQuestionBank) {
    throw new AppError("no practical question bank found", 400);
  }
  if (!batch.isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const candidate = await prisma.candidate.findFirst({
    where: { id: candidateId, batchId: batchId },
    select: {
      isPresentInPractical: true,
      practicalExamStatus: true,
    },
  });
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (candidate.practicalExamStatus === "submitted") {
    throw new AppError("Candidate already submitted", 400);
  }
  if (!candidate.isPresentInPractical) {
    throw new AppError("Candidate is not present in practical", 400);
  }
  if (responses.length === 0) {
    throw new AppError("No responses found", 400);
  }
  if (evidence) {
    console.log("evidence", evidence.mimetype);
    if (!evidence?.mimetype?.startsWith("video/")) {
      throw new AppError("Invalid file type", 400);
    }
    if (evidence.size > 50 * 1024 * 1024) {
      throw new AppError("File size exceeds 5MB", 400);
    }
    const ext = evidence.name.split(".").pop();
    const uploadPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "batches",
      batchId,
      "evidences",
      "candidates",
      candidateId,
      "videos",
      "PRACTICAL",
      `evidence.${ext}`
    );
    await evidence.mv(uploadPath);
  }
  await prisma.$transaction([
    prisma.examResponse.createMany({
      data: responses.map((response: any) => ({
        questionId: response.questionId,
        answerId: "no-answer-mentioned-practial-submitted-by-assessor",
        marksObtained: response.marksObtained,
        candidateId: candidateId,
        batchId: batchId,
        startedAt: new Date(),
        endedAt: new Date(),
        type: "PRACTICAL",
      })),
    }),
    prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        practicalExamStatus: "submitted",
        isPresentInPractical: false,
      },
    }),
  ]);
};
const submitCandidateVivaResponses = async (
  responses: any,
  candidateId: string,
  batchId: string,
  assessorId: string,
  evidence?: UploadedFile
) => {
  const batch = await prisma.batch.findFirst({
    where: { id: batchId, assessor: assessorId },
  });
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch.vivaQuestionBank) {
    throw new AppError("no viva question bank found", 400);
  }
  if (!batch.isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const candidate = await prisma.candidate.findFirst({
    where: { id: candidateId, batchId: batchId },
    select: {
      isPresentInViva: true,
      vivaExamStatus: true,
    },
  });
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (candidate.vivaExamStatus === "submitted") {
    throw new AppError("Candidate already submitted", 400);
  }
  if (!candidate.isPresentInViva) {
    throw new AppError("Candidate is not present in viva", 400);
  }
  if (responses.length === 0) {
    throw new AppError("No responses found", 400);
  }
  if (evidence) {
    if (!evidence.mimetype.startsWith("video/")) {
      throw new AppError("Invalid file type", 400);
    }
    if (evidence.size > 50 * 1024 * 1024) {
      throw new AppError("File size exceeds 2MB", 400);
    }
    const ext = evidence.name.split(".").pop();
    const uploadPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "batches",
      batchId,
      "evidences",
      "candidates",
      candidateId,
      "videos",
      "VIVA",
      `evidence.${ext}`
    );
    await evidence.mv(uploadPath);
  }

  await prisma.$transaction([
    prisma.examResponse.createMany({
      data: responses.map((response: any) => ({
        questionId: response.questionId,
        answerId: "no-answer-mentioned-viva-submitted-by-assessor",
        marksObtained: response.marksObtained,
        candidateId: candidateId,
        batchId: batchId,
        startedAt: new Date(),
        endedAt: new Date(),
        type: "VIVA",
      })),
    }),
    prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        vivaExamStatus: "submitted",
        isPresentInViva: false,
      },
    }),
  ]);
};
const getPracticalQuestionBank = async (
  batchId: string,
  assessorId: string
) => {
  const batch = await prisma.batch.findFirst({
    where: {
      id: batchId,
      assessor: assessorId,
    },
  });
  if (!batch) {
    throw new AppError("batch not found", 404);
  }
  if (!batch.practicalQuestionBank) {
    throw new AppError("practical question bank not found", 404);
  }
  return JSON.parse(batch.practicalQuestionBank);
};
const getVivaQuestionBank = async (batchId: string, assessorId: string) => {
  const batch = await prisma.batch.findFirst({
    where: {
      id: batchId,
      assessor: assessorId,
    },
  });
  if (!batch) {
    throw new AppError("batch not found", 404);
  }
  if (!batch.vivaQuestionBank) {
    throw new AppError("viva question bank not found", 404);
  }
  return JSON.parse(batch.vivaQuestionBank);
};
const syncCandidate = async (
  batchId: string,
  candidateId: string,
  token: string
) => {
  // upload random photos
  // 1. upload theory random photos
  const randomPhotos = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    "batches",
    batchId,
    "evidences",
    "candidates",
    candidateId,
    "photos",
    "THEORY"
  );
  if (!fs.existsSync(randomPhotos)) {
    throw new AppError("Directory does not exist: " + randomPhotos, 404);
  }
  const photos = await fs.promises.readdir(randomPhotos);
  const signedUrlsToUploadRandomPhotos = await Promise.all(
    photos.map((photo) =>
      axios.get(
        `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=image&fileName=${photo}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    )
  );
  await Promise.all(
    photos.map((photo, index) => {
      const filePath = path.join(randomPhotos, photo);
      if (!fs.existsSync(filePath)) {
        throw new AppError("File does not exist: " + filePath, 404);
      }
      return axios.put(signedUrlsToUploadRandomPhotos[index].data.data.url, {
        file: fs.createReadStream(filePath),
      });
    })
  );
  const randomVideos = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    "batches",
    batchId,
    "evidences",
    "candidates",
    candidateId,
    "videos",
    "THEORY"
  );
  if (!fs.existsSync(randomVideos)) {
    throw new AppError("Directory does not exist: " + randomVideos, 404);
  }
  const videos = await fs.promises.readdir(randomVideos);
  const signedUrlsToUploadRandomVideos = await Promise.all(
    videos.map((video) =>
      axios.get(
        `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=video&fileName=${video}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    )
  );
  await Promise.all(
    videos.map((video, index) => {
      const filePath = path.join(randomVideos, video);
      if (!fs.existsSync(filePath)) {
        throw new AppError("File does not exist: " + filePath, 404);
      }
      return axios.put(signedUrlsToUploadRandomVideos[index].data.data.url, {
        file: fs.createReadStream(filePath),
      });
    })
  );
};
export default {
  getAssignedBatches,
  saveBatchOffline,
  getLoadedBatches,
  markAttendanceInTheory,
  markAttendanceInPractical,
  markAttendanceInViva,
  getCandidateList,
  resetCandidates,
  markAssessorAsReached,
  startBatch,
  deleteBatches,
  submitCandidatePracticalResponses,
  submitCandidateVivaResponses,
  resetCandidatesPractical,
  resetCandidatesViva,
  syncCandidate,
  getPracticalQuestionBank,
  getVivaQuestionBank,
};
