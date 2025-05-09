// @ts-nocheck
import axios from "axios";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/AppError";
import { UploadedFile } from "express-fileupload";
import mime from "mime-types";
import {
  batches as batchTable,
  candidates as candidateTable,
  examResponses as examResponseTable,
} from "../db/schema";
import { eq, and, or, inArray } from "drizzle-orm";
import db from "../db";

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

    const { batch, candidates } = response.data.data;

    batch.assessorCoordinates = batch.assessorCoordinates
      ? JSON.stringify(batch.assessorCoordinates)
      : null;

    const preparedBatch = { ...batch, id: batch._id };
    const preparedCandidates = candidates.docs.map((candidate: any) => ({
      ...candidate,
      batchId: batch._id,
      id: candidate._id,
    }));

    db.transaction((tx) => {
      tx.insert(batchTable).values(preparedBatch).run();
      tx.insert(candidateTable).values(preparedCandidates).run();
      return;
    });
    console.log("Batch and candidates saved successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }

    console.error("error", error);
    throw new AppError("internal server error", 500);
  }
};

const getLoadedBatches = async (assessorId: string) => {
  try {
    const batches = await db
      .select()
      .from(batchTable)
      .where(eq(batchTable.assessor, assessorId));
    console.log("batches", batches);
    return batches;
  } catch (error) {
    console.log("error", error);
    throw new AppError("internal server error", 500);
  }
};
const getCandidateList = async (batchId: string, assessorId: string) => {
  // const batch = await prisma.batch.findFirst({
  //   where: { id: batchId, assessor: assessorId },
  // });
  // if (!batch) {
  //   throw new AppError("Batch not found", 404);
  // }
  // if (!batch.isAssessorReached) {
  //   throw new AppError("mark yourself as reached", 400);
  // }
  // return await prisma.candidate.findMany({
  //   where: {
  //     batchId: batchId,
  //   },
  // });
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const candidates = await db
    .select()
    .from(candidateTable)
    .where(eq(candidateTable.batchId, batchId));
  return candidates;
};
const markAttendanceInTheory = async (
  candidates: string[],
  batchId: string,
  assessorId: string
) => {
  try {
    const batch = await db
      .select()
      .from(batchTable)
      .where(
        and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId))
      )
      .limit(1);
    if (!batch) {
      throw new AppError("Batch not found", 404);
    }
    if (!batch[0].theoryQuestionBank) {
      throw new AppError("no theory question bank found", 400);
    }
    if (batch[0].status === "assigned") {
      throw new AppError("Batch is not started yet", 400);
    }
    if (batch[0].status === "completed") {
      throw new AppError("Batch is already completed", 400);
    }
    if (!batch[0].isAssessorReached) {
      throw new AppError("mark yourself as reached", 400);
    }
    const updatedCandidates = await db
      .update(candidateTable)
      .set({ isPresentInTheory: true })
      .where(
        and(
          eq(candidateTable.batchId, batchId),
          or(...candidates.map((id) => eq(candidateTable.id, id)))
        )
      );
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
  const batch = await db
    .select()
    .from(batchTable)
    .where(
      and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId))
    );
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].practicalQuestionBank) {
    throw new AppError("no practical question bank found", 400);
  }
  if (batch[0].status === "assigned") {
    throw new AppError("Batch is not started yet", 400);
  }
  if (batch[0].status === "completed") {
    throw new AppError("Batch is already completed", 400);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const updatedCandidates = await db
    .update(candidateTable)
    .set({ isPresentInPractical: true })
    .where(
      and(
        eq(candidateTable.batchId, batchId),
        or(...candidates.map((id) => eq(candidateTable.id, id)))
      )
    );
  return updatedCandidates;
};
const markAttendanceInViva = async (
  candidates: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].vivaQuestionBank) {
    throw new AppError("no viva question bank found", 400);
  }
  if (batch[0].status === "assigned") {
    throw new AppError("Batch is not started yet", 400);
  }
  if (batch[0].status === "completed") {
    throw new AppError("Batch is already completed", 400);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const updatedCandidates = await db
    .update(candidateTable)
    .set({ isPresentInViva: true })
    .where(
      and(
        eq(candidateTable.batchId, batchId),
        or(...candidates.map((id) => eq(candidateTable.id, id)))
      )
    );
  return updatedCandidates;
};
const resetCandidates = async (
  candidateIds: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  if (batch[0].status !== "ongoing") {
    throw new AppError("Batch is not ongoing", 400);
  }
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

  db.transaction((tx) => {
    tx.update(candidateTable)
      .set({
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
      })
      .where(
        and(
          eq(candidateTable.batchId, batchId),
          or(...candidateIds.map((id) => eq(candidateTable.id, id)))
        )
      )
      .run();
    tx.delete(examResponseTable)
      .where(inArray(examResponseTable.candidateId, candidateIds))
      .run();
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
};
const resetCandidatesPractical = async (
  candidateIds: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  if (batch[0].status !== "ongoing") {
    throw new AppError("Batch is not ongoing", 400);
  }
  const examFolders = [
    ["videos", "PRACTICAL"],
    ["photos", "PRACTICAL"],
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

  await db
    .update(candidateTable)
    .set({
      isPresentInPractical: false,
      practicalExamStatus: "notStarted",
      practicalStartedAt: null,
      practicalSubmittedAt: null,
    })
    .where(
      and(
        eq(candidateTable.batchId, batchId),
        or(...candidateIds.map((id) => eq(candidateTable.id, id)))
      )
    );
  await Promise.all(
    deletePaths.map(async (targetPath) => {
      try {
        await fs.promises.rm(targetPath, { recursive: true, force: true });
      } catch (err) {
        console.error(`Failed to delete ${targetPath}:`, err);
      }
    })
  );
};
const resetCandidatesViva = async (
  candidateIds: string[],
  batchId: string,
  assessorId: string
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  if (batch[0].status !== "ongoing") {
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
  db.transaction((tx) => {
    tx.update(candidateTable)
      .set({
        isPresentInViva: false,
        vivaExamStatus: "notStarted",
      })
      .where(
        and(
          eq(candidateTable.batchId, batchId),
          or(...candidateIds.map((id) => eq(candidateTable.id, id)))
        )
      )
      .run();
    tx.delete(examResponseTable)
      .where(
        and(
          inArray(examResponseTable.candidateId, candidateIds),
          eq(examResponseTable.batchId, batchId),
          eq(examResponseTable.type, "VIVA")
        )
      )
      .run();
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
};
const markAssessorAsReached = async (
  batchId: string,
  assessorId: string,
  picture?: UploadedFile,
  location?: { lat: number; long: number }
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (batch[0].isAssessorReached) {
    throw new AppError("Assessor already reached", 400);
  }
  if (!batch[0].isAssessorEvidenceRequired) {
    await db
      .update(batchTable)
      .set({
        isAssessorReached: true,
        assessorReachedAt: new Date().toISOString(),
        assessorCoordinates: null,
        assessorGroupPhoto: null,
      })
      .where(eq(batchTable.id, batchId));
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
  await db
    .update(batchTable)
    .set({
      isAssessorReached: true,
      assessorReachedAt: new Date().toISOString(),
      assessorCoordinates: JSON.stringify(location),
      assessorGroupPhoto: p as string,
    })
    .where(eq(batchTable.id, batchId));
};
const startBatch = async (batchId: string, assessorId: string) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  await db
    .update(batchTable)
    .set({
      status: "ongoing",
    })
    .where(eq(batchTable.id, batchId));
};
const deleteBatches = async (ids: string[], assessorId: string) => {
  const batches = await db
    .select()
    .from(batchTable)
    .where(
      and(inArray(batchTable.id, ids), eq(batchTable.assessor, assessorId))
    );
  if (ids.length !== batches.length) {
    throw new AppError("Batch not found", 404);
  }
  await db
    .delete(batchTable)
    .where(
      and(inArray(batchTable.id, ids), eq(batchTable.assessor, assessorId))
    );
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
};
const submitCandidatePracticalResponses = async (
  responses: any,
  candidateId: string,
  batchId: string,
  assessorId: string,
  evidence?: UploadedFile
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (batch[0].isPracticalVisibleToCandidate) {
    throw new AppError(
      "Practical is visible to candidate,can't submit practical",
      400
    );
  }
  if (!batch[0].practicalQuestionBank) {
    throw new AppError("no practical question bank found", 400);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const candidate = await db
    .select()
    .from(candidateTable)
    .where(
      and(
        eq(candidateTable.id, candidateId),
        eq(candidateTable.batchId, batchId)
      )
    )
    .limit(1);
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (candidate[0].practicalExamStatus === "submitted") {
    throw new AppError("Candidate already submitted", 400);
  }
  if (!candidate[0].isPresentInPractical) {
    throw new AppError("Candidate is not present in practical", 400);
  }
  if (responses.length === 0) {
    return;
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
      "PRACTICAL",
      `evidence.${ext}`
    );
    await evidence.mv(uploadPath);
  }
  db.transaction((tx) => {
    tx.insert(examResponseTable)
      .values(
        responses.map((response: any) => ({
          questionId: response.questionId,
          answerId: "no-answer-mentioned-practial-submitted-by-assessor",
          marksObtained: response.marksObtained,
          candidateId: candidateId,
          batchId: batchId,
          startedAt: new Date(),
          endedAt: new Date(),
          type: "PRACTICAL",
        }))
      )
      .run();
    tx.update(candidateTable)
      .set({
        practicalExamStatus: "submitted",
        isPresentInPractical: false,
      })
      .where(eq(candidateTable.id, candidateId))
      .run();
  });
};
const submitCandidateVivaResponses = async (
  responses: any,
  candidateId: string,
  batchId: string,
  assessorId: string,
  evidence?: UploadedFile
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].vivaQuestionBank) {
    throw new AppError("no viva question bank found", 400);
  }
  if (!batch[0].isAssessorReached) {
    throw new AppError("mark yourself as reached", 400);
  }
  const candidate = await db
    .select()
    .from(candidateTable)
    .where(
      and(
        eq(candidateTable.id, candidateId),
        eq(candidateTable.batchId, batchId)
      )
    )
    .limit(1);
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (candidate[0].vivaExamStatus === "submitted") {
    throw new AppError("Candidate already submitted", 400);
  }
  if (!candidate[0].isPresentInViva) {
    throw new AppError("Candidate is not present in viva", 400);
  }
  if (responses.length === 0) {
    return;
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
  db.transaction((tx) => {
    tx.insert(examResponseTable)
      .values(
        responses.map((response: any) => ({
          questionId: response.questionId,
          answerId: "no-answer-mentioned-viva-submitted-by-assessor",
          marksObtained: response.marksObtained,
          candidateId: candidateId,
          batchId: batchId,
          startedAt: new Date(),
          endedAt: new Date(),
          type: "VIVA",
        }))
      )
      .run();
    tx.update(candidateTable)
      .set({
        vivaExamStatus: "submitted",
        isPresentInViva: false,
      })
      .where(eq(candidateTable.id, candidateId))
      .run();
  });
};
const getPracticalQuestionBank = async (
  batchId: string,
  assessorId: string
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("batch not found", 404);
  }
  if (!batch[0].practicalQuestionBank) {
    throw new AppError("practical question bank not found", 404);
  }
  return JSON.parse(batch[0].practicalQuestionBank);
};
const getVivaQuestionBank = async (batchId: string, assessorId: string) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);
  if (!batch) {
    throw new AppError("batch not found", 404);
  }
  if (!batch[0].vivaQuestionBank) {
    throw new AppError("viva question bank not found", 404);
  }
  return JSON.parse(batch[0].vivaQuestionBank);
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
    const candidate = await db
      .select()
      .from(candidateTable)
      .where(eq(candidateTable.id, candidateId));
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
    const theoryResponses = await db
      .select()
      .from(examResponseTable)
      .where(
        and(
          eq(examResponseTable.candidateId, candidateId),
          eq(examResponseTable.type, "THEORY")
        )
      );
    const practicalResponses = await db
      .select()
      .from(examResponseTable)
      .where(
        and(
          eq(examResponseTable.candidateId, candidateId),
          eq(examResponseTable.type, "PRACTICAL")
        )
      );
    const vivaResponses = await db
      .select()
      .from(examResponseTable)
      .where(
        and(
          eq(examResponseTable.candidateId, candidateId),
          eq(examResponseTable.type, "VIVA")
        )
      );
    const finalResponses = {
      assessorDetails: {},
      candidateDetails: {
        isEvidanceUploaded: candidate[0]?.isEvidanceUploaded,
        isPresentInTheory: candidate[0]?.isPresentInTheory,
        isPresentInPractical: candidate[0]?.isPresentInPractical,
        isPresentInViva: candidate[0]?.isPresentInViva,
        theoryExamStatus: candidate[0]?.theoryExamStatus,
        practicalExamStatus: candidate[0]?.practicalExamStatus,
        vivaExamStatus: candidate[0]?.vivaExamStatus,
        theoryStartedAt: candidate[0]?.theoryStartedAt,
        theorySubmittedAt: candidate[0]?.theoryStartedAt,
        practicalStartedAt: candidate[0]?.theorySubmittedAt,
        practicalSubmittedAt: candidate[0]?.practicalSubmittedAt,
        faceHiddenCount: candidate[0]?.faceHiddenCount,
        tabSwitchCount: candidate[0]?.tabSwitchCount,
        exitFullScreenCount: candidate[0]?.exitFullScreenCount,
        multipleFaceDetectionCount: candidate[0]?.multipleFaceDetectionCount,
        candidateSelfieCoordinates: candidate[0]?.candidateSelfieCoordinates
          ? // @ts-ignore
            JSON.parse(candidate[0]?.candidateSelfieCoordinates)
          : {},
        candidateSelfieTakenAt: candidate[0]?.candidateSelfieTakenAt,
        adharcardPicture:
          signedUrlsToUploadAdharSelfie.data.data.adhar.location,
        candidateSelfie:
          signedUrlsToUploadAdharSelfie.data.data.selfie.location,
      },
      theory: [],
      practical: [],
      viva: [],
    };
    theoryResponses.forEach((response: any) => {
      // @ts-ignore
      finalResponses.theory.push({
        questionId: response.questionId,
        answerId: response.answerId,
        startedAt: response.startedAt,
        endedAt: response.endedAt,
      });
    });
    practicalResponses.forEach((response: any) => {
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
    vivaResponses.forEach((response: any) => {
      // @ts-ignore
      finalResponses.viva.push({
        questionId: response.questionId,
        answerId: response.answerId,
        marksObtained: response.marksObtained || 0,
      });
    });
    const batch = await db
      .select()
      .from(batchTable)
      .where(eq(batchTable.id, batchId));
    const assessorDetails = {
      isAssessorReached: batch[0]?.isAssessorReached,
      assessorReachedAt: batch[0]?.assessorReachedAt,
      assessorCoordinates: batch[0]?.assessorCoordinates
        ? // @ts-ignore
          JSON.parse(candidate?.batch.assessorCoordinates)
        : {},
      assessorGroupPhoto: "",
    };

    if (batch[0].isAssessorEvidenceRequired) {
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
