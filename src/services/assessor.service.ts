import axios from "axios";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/AppError";
import { PrismaClient } from "../../generated/prisma";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import { UploadedFile } from "express-fileupload";
import mime from "mime-types";
import e from "express";
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
  await prisma.$transaction(async (tx) => {
    const examFolders = [
      ["photos", "THEORY"],
      ["videos", "THEORY"],
      ["videos", "PRACTICAL"],
      ["videos", "VIVA"],
      ["adhar"],
      ["selfie"],
    ];

    const deletePaths = candidateIds.flatMap((candidateId) => {
      const basePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        "batches",
        batchId,
        "evidences",
        "candidates",
        candidateId
      );
      return examFolders.map((addOn) => path.join(basePath, ...addOn));
    });

    await Promise.all([
      candidateIds.map(async (candidateId) => {
        return fs.promises.rm(
          path.join(
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
          ),
          { recursive: true, force: true }
        );
      }),
      candidateIds.map(async (candidateId) => {
        return fs.promises.rm(
          path.join(
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
          ),
          { recursive: true, force: true }
        );
      }),
      candidateIds.map(async (candidateId) => {
        return fs.promises.rm(
          path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            "batches",
            batchId,
            "evidences",
            "candidates",
            candidateId,
            "adhar"
          ),
          { recursive: true, force: true }
        );
      }),
      candidateIds.map(async (candidateId) => {
        return fs.promises.rm(
          path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            "batches",
            batchId,
            "evidences",
            "candidates",
            candidateId,
            "selfie"
          ),
          { recursive: true, force: true }
        );
      }),
    ]);
    await tx.examResponse.deleteMany({
      where: {
        candidateId: { in: candidateIds },
        batchId: batchId,
        type: "THEORY",
      },
    });
    await tx.candidate.updateMany({
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
        multipleFaceDetectionCount: 0,
        isEvidanceUploaded: false,
        faceHiddenCount: 0,
        tabSwitchCount: 0,
        exitFullScreenCount: 0,
      },
    });
  });
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
  await prisma.$transaction(async (tx) => {
    await tx.examResponse.deleteMany({
      where: {
        candidateId: { in: candidateIds },
        batchId: batchId,
        type: "PRACTICAL",
      },
    });
    await tx.candidate.updateMany({
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
    });
    await Promise.all([
      candidateIds.map(async (candidateId) => {
        return fs.promises.rm(
          path.join(
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
            "PRACTICAL"
          ),
          { recursive: true, force: true }
        );
      }),
      candidateIds.map(async (candidateId) => {
        return fs.promises.rm(
          path.join(
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
            "Practical"
          ),
          { recursive: true, force: true }
        );
      }),
    ]);
  });
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
  const examFolders = [["videos", "VIVA"]];
  const deletePaths = candidateIds.flatMap((candidateId) => {
    const basePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "batches",
      batchId,
      "evidences",
      "candidates",
      candidateId
    );
    return examFolders.map((addOn) => path.join(basePath, ...addOn));
  });
  await prisma.$transaction(async (tx) => {
    await tx.candidate.updateMany({
      where: {
        id: { in: candidateIds },
        batchId: batchId,
      },
      data: {
        isPresentInViva: false,
        vivaExamStatus: "notStarted",
      },
    });
    await tx.examResponse.deleteMany({
      where: {
        candidateId: { in: candidateIds },
        batchId: batchId,
        type: "VIVA",
      },
    });
    await Promise.all(
      deletePaths.map(async (targetPath) => {
        try {
          await fs.promises.rm(targetPath, { recursive: true, force: true });
        } catch (err) {
          console.error(`Failed to delete ${targetPath}:`, err);
        }
      })
    );
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
  const ext = picture.name.split(".").pop();
  if (!ext) {
    throw new AppError("Invalid file name", 400);
  }
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
    "batches",
    batchId,
    "evidences",
    "assessor",
    "group-photo",
    `${Date.now()}.${ext}`
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
  const batches = await prisma.batch.findMany({
    where: {
      id: { in: ids },
      assessor: assessorId,
    },
  });
  if (ids.length !== batches.length) {
    throw new AppError("Batch not found", 404);
  }
  await prisma.$transaction(async (tx) => {
    await Promise.all(
      ids.map((id) => {
        const folderPath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          "batches",
          id
        );
        if (fs.existsSync(folderPath)) {
          fs.promises.rm(folderPath, { recursive: true, force: true });
        }
      })
    );
    await tx.batch.deleteMany({
      where: {
        id: { in: ids },
        assessor: assessorId,
      },
    });
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
    if (evidence.size > 100 * 1024 * 1024) {
      throw new AppError("File size exceeds 100MB", 400);
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
    if (evidence.size > 100 * 1024 * 1024) {
      throw new AppError("File size exceeds 100MB", 400);
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
  if (!token) {
    throw new AppError("server token is required", 401);
  }
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
  try {
    const candidate = await prisma.candidate.findFirst({
      where: {
        id: candidateId,
      },
      select: {
        batch: true,
        isEvidanceUploaded: true,
        isPresentInTheory: true,
        isPresentInPractical: true,
        isPresentInViva: true,
        theoryExamStatus: true,
        practicalExamStatus: true,
        vivaExamStatus: true,
        theoryStartedAt: true,
        theorySubmittedAt: true,
        practicalStartedAt: true,
        practicalSubmittedAt: true,
        faceHiddenCount: true,
        tabSwitchCount: true,
        exitFullScreenCount: true,
        multipleFaceDetectionCount: true,
        candidateSelfieCoordinates: true,
        candidateSelfieTakenAt: true,
      },
    });
    if (!candidate) {
      return;
    }
    if (fs.existsSync(randomPhotos)) {
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
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            return axios.put(
              signedUrlsToUploadRandomPhotos[index].data.data.url,
              buffer,
              {
                headers: {
                  "Content-Type":
                    mime.lookup(photo) || "application/octet-stream",
                },
              }
            );
          }
        })
      );
    }
    if (fs.existsSync(path.join(randomPhotos, "..", "PRACTICAL"))) {
      const practicalPhotos = await fs.promises.readdir(
        path.join(randomPhotos, "..", "PRACTICAL")
      );
      const signedUrlsToUploadPracticalPhotos = await Promise.all(
        practicalPhotos.map((photo) =>
          axios.get(
            `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=image&fileName=${photo}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      await Promise.all(
        practicalPhotos.map((photo, index) => {
          const filePath = path.join(randomPhotos, "..", "PRACTICAL", photo);
          if (!fs.existsSync(filePath)) {
            throw new AppError("File does not exist: " + filePath, 404);
          }
          const buffer = fs.readFileSync(filePath);
          return axios.put(
            signedUrlsToUploadPracticalPhotos[index].data.data.url,
            buffer,
            {
              headers: {
                "Content-Type":
                  mime.lookup(photo) || "application/octet-stream",
              },
            }
          );
        })
      );
    }
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
    if (fs.existsSync(path.join(randomVideos, "..", "PRACTICAL"))) {
      const practicalVideos = await fs.promises.readdir(
        path.join(randomVideos, "..", "PRACTICAL")
      );
      const signedUrlsToUploadPracticalVideos = await Promise.all(
        practicalVideos.map((video) =>
          axios.get(
            `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${video}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      await Promise.all(
        practicalVideos.map((video, index) => {
          const filePath = path.join(randomVideos, "..", "PRACTICAL", video);
          if (!fs.existsSync(filePath)) {
            throw new AppError("File does not exist: " + filePath, 404);
          }
          const buffer = fs.readFileSync(filePath);
          return axios.put(
            signedUrlsToUploadPracticalVideos[index].data.data.url,
            buffer,
            {
              headers: {
                "Content-Type":
                  mime.lookup(video) || "application/octet-stream",
              },
            }
          );
        })
      );
    }
    if (fs.existsSync(path.join(randomVideos, "..", "VIVA"))) {
      const vivaVideos = await fs.promises.readdir(
        path.join(randomVideos, "..", "VIVA")
      );
      const signedUrlsToUploadVivaVideos = await Promise.all(
        vivaVideos.map((video) =>
          axios.get(
            `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=viva&evidenceType=video&fileName=${video}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      await Promise.all(
        vivaVideos.map((video, index) => {
          const filePath = path.join(randomVideos, "..", "VIVA", video);
          if (!fs.existsSync(filePath)) {
            throw new AppError("File does not exist: " + filePath, 404);
          }
          const buffer = fs.readFileSync(filePath);
          return axios.put(
            signedUrlsToUploadVivaVideos[index].data.data.url,
            buffer,
            {
              headers: {
                "Content-Type":
                  mime.lookup(video) || "application/octet-stream",
              },
            }
          );
        })
      );
    }
    if (fs.existsSync(randomVideos)) {
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
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            return axios.put(
              signedUrlsToUploadRandomVideos[index].data.data.url,
              buffer,
              {
                headers: {
                  "Content-Type":
                    mime.lookup(video) || "application/octet-stream",
                },
              }
            );
          }
        })
      );
    }
    let adharName = "";
    let selfieName = "";
    let adharContentType = "";
    let selfieContentType = "";
    if (fs.existsSync(path.join(randomPhotos, "..", "..", "adhar"))) {
      const adhar = await fs.promises.readdir(
        path.join(randomPhotos, "..", "..", "adhar")
      );
      if (adhar.length === 0) {
        console.log("No files in folder");
      } else {
        adharName = adhar[0];
        console.log("adharName", adharName);
        adharContentType = mime.lookup(adharName) || "application/octet-stream";
      }
    }
    if (fs.existsSync(path.join(randomPhotos, "..", "..", "selfie"))) {
      const selfie = await fs.promises.readdir(
        path.join(randomPhotos, "..", "..", "selfie")
      );
      if (selfie.length === 0) {
        console.log("No files in folder");
      } else {
        selfieName = selfie[0];
        selfieContentType =
          mime.lookup(selfieName) || "application/octet-stream";
      }
    }
    const signedUrlsToUploadAdharSelfie = await axios.get(
      `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-candidate-adhar-or-selfie?adharFileName=${adharName}&selfieFileName=${selfieName}&adharContentType=${adharContentType}&selfieContentType=${selfieContentType}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const uploadAdharSelfiePromises = [];
    if (adharName) {
      const adharFilePath = path.join(
        randomPhotos,
        "..",
        "..",
        "adhar",
        adharName
      );
      if (fs.existsSync(adharFilePath)) {
        const buffer = fs.readFileSync(adharFilePath);
        console.log("buffer", buffer);
        uploadAdharSelfiePromises.push(
          axios.put(signedUrlsToUploadAdharSelfie.data.data.adhar.url, buffer, {
            headers: {
              "Content-Type": adharContentType,
            },
          })
        );
      }
    }
    if (selfieName) {
      const selfieFilePath = path.join(
        randomPhotos,
        "..",
        "..",
        "selfie",
        selfieName
      );
      const buffer = fs.readFileSync(selfieFilePath);
      if (fs.existsSync(selfieFilePath)) {
        uploadAdharSelfiePromises.push(
          axios.put(
            signedUrlsToUploadAdharSelfie.data.data.selfie.url,
            buffer,
            {
              headers: {
                "Content-Type": selfieContentType,
              },
            }
          )
        );
      }
    }
    await Promise.all(uploadAdharSelfiePromises);

    const theoryResponses = await prisma.examResponse.findMany({
      where: {
        candidateId,
        type: "THEORY",
      },
    });
    const practicalResponses = await prisma.examResponse.findMany({
      where: {
        candidateId,
        type: "PRACTICAL",
      },
    });
    const vivaResponses = await prisma.examResponse.findMany({
      where: { candidateId, type: "VIVA" },
    });
    const finalResponses = {
      assessorDetails: {},
      candidateDetails: {
        isEvidanceUploaded: candidate?.isEvidanceUploaded,
        isPresentInTheory: candidate?.isPresentInTheory,
        isPresentInPractical: candidate?.isPresentInPractical,
        isPresentInViva: candidate?.isPresentInViva,
        theoryExamStatus: candidate?.theoryExamStatus,
        practicalExamStatus: candidate?.practicalExamStatus,
        vivaExamStatus: candidate?.vivaExamStatus,
        theoryStartedAt: candidate?.theoryStartedAt,
        theorySubmittedAt: candidate?.theoryStartedAt,
        practicalStartedAt: candidate?.theorySubmittedAt,
        practicalSubmittedAt: candidate?.practicalSubmittedAt,
        faceHiddenCount: candidate?.faceHiddenCount,
        tabSwitchCount: candidate?.tabSwitchCount,
        exitFullScreenCount: candidate?.exitFullScreenCount,
        multipleFaceDetectionCount: candidate?.multipleFaceDetectionCount,
        candidateSelfieCoordinates: candidate?.candidateSelfieCoordinates
          ? // @ts-ignore
            JSON.parse(candidate?.candidateSelfieCoordinates)
          : {},
        candidateSelfieTakenAt: candidate?.candidateSelfieTakenAt,
        adharcardPicture:
          signedUrlsToUploadAdharSelfie.data.data.adhar.location,
        candidateSelfie:
          signedUrlsToUploadAdharSelfie.data.data.selfie.location,
      },
      theory: [],
      practical: [],
      viva: [],
    };
    theoryResponses.forEach((response) => {
      // @ts-ignore
      finalResponses.theory.push({
        questionId: response.questionId,
        answerId: response.answerId,
        startedAt: response.startedAt,
        endedAt: response.endedAt,
      });
    });
    practicalResponses.forEach((response) => {
      console.log("practical response = ", response);
      const obj = {
        questionId: response.questionId,
      };
      // @ts-ignore

      if (candidate?.batch.isPracticalVisibleToCandidate) {
        // @ts-ignore
        obj["startedAt"] = response.startedAt;
        // @ts-ignore
        obj["endedAt"] = response.endedAt;
        // @ts-ignore
        obj["answerId"] = response.answerId;
      } else {
        // @ts-ignore
        obj["marksObtained"] = response.marksObtained || 0;
      }
      // @ts-ignore
      finalResponses.practical.push(obj);
    });
    vivaResponses.forEach((response) => {
      // @ts-ignore
      finalResponses.viva.push({
        questionId: response.questionId,
        answerId: response.answerId,
        marksObtained: response.marksObtained || 0,
      });
    });
    const assessorDetails = {
      isAssessorReached: candidate?.batch.isAssessorReached,
      assessorReachedAt: candidate?.batch.assessorReachedAt,
      assessorCoordinates: candidate?.batch.assessorCoordinates
        ? // @ts-ignore
          JSON.parse(candidate?.batch.assessorCoordinates)
        : {},
      assessorGroupPhoto: "",
    };
    if (candidate?.batch.isAssessorEvidenceRequired) {
      if (
        fs.existsSync(
          path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            "batches",
            batchId,
            "evidences",
            "assessor",
            "group-photo"
          )
        )
      ) {
        const evidences = await fs.promises.readdir(
          path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            "batches",
            batchId,
            "evidences",
            "assessor",
            "group-photo"
          )
        );
        const responses = await Promise.all(
          evidences.map((evidence) => {
            return axios.get(
              `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/presigned-url-for-assessor`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
          })
        );
        const uploadPromises = evidences.map((evidence, index) => {
          const filePath = path.join(
            __dirname,
            "..",
            "..",
            "uploads",
            "batches",
            batchId,
            "evidences",
            "assessor",
            "group-photo",
            evidence
          );
          if (!fs.existsSync(filePath)) {
            throw new AppError("File does not exist: " + filePath, 404);
          }
          const buffer = fs.readFileSync(filePath);
          return axios.put(responses[index].data.data.url, buffer, {
            headers: {
              "Content-Type":
                mime.lookup(evidence) || "application/octet-stream",
            },
          });
        });
        await Promise.all(uploadPromises);
        assessorDetails.assessorGroupPhoto = responses[0].data.data.location;
      }
    }
    finalResponses.assessorDetails = assessorDetails;
    await axios.post(
      `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-responses`,
      {
        responses: finalResponses,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
      if (error.response?.status === 404) {
        // console.log("error.response?.data", error.response?.data);
        throw new AppError("resource not found", 404);
      }
      if (error.response?.status === 400) {
        throw new AppError(
          error.response.data.message || "something went wrong",
          400
        );
      }
    }
  }
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
