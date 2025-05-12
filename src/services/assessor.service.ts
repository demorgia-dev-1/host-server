// @ts-nocheck
import axios from "axios";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/AppError";
import { UploadedFile } from "express-fileupload";
import mime from "mime-types";
import ip from "ip";
import { v4 as uuid } from "uuid";
import {
  batches as batchTable,
  candidates as candidateTable,
  examResponses as examResponseTable,
  comments as commentTable,
} from "../db/schema";
import { eq, and, or, inArray } from "drizzle-orm";
import db from "../db";
import {
  downloadMediaAndReplaceUrls,
  replaceMediaUrlsWithArray,
} from "../utils/mediaLocalizer";
import { NextFunction } from "express";

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
      candidates,
      theoryQuestionBank,
      practicalQuestionBank,
      vivaQuestionBank,
      sectorLogo,
    } = response.data.data;
    let uploadLogoUrl = "";
    if (sectorLogo) {
      const LOCAL_SERVER_BASE_URL = "{{BASE_URL}}/static/assets";
      const LOCAL_ASSET_DIR = path.join(__dirname, "..", "..", "public/assets");
      const ext = path.extname(sectorLogo);
      const filename = uuid() + ext;
      const localPath = path.join(LOCAL_ASSET_DIR, filename);
      if (!fs.existsSync(LOCAL_ASSET_DIR)) {
        fs.mkdirSync(LOCAL_ASSET_DIR, { recursive: true });
      }
      const response = await axios.get(sectorLogo, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(localPath, response.data);
      uploadLogoUrl = LOCAL_SERVER_BASE_URL + "/" + filename;
    }

    if (theoryQuestionBank) {
      const questionBank = theoryQuestionBank[0];
      for (const question of questionBank.questions) {
        const options = await Promise.all(
          question.options.map((option: any) => {
            return downloadMediaAndReplaceUrls(option.option);
          })
        );
        question.options.forEach((option: any, index: number) => {
          option.option = replaceMediaUrlsWithArray(
            option.option,
            options[index]
          );

          if (option?.translations) {
            for (const [key, value] of Object.entries(option.translations)) {
              const replacement = replaceMediaUrlsWithArray(
                option.translations[key],
                options[index]
              );
              option.translations[key] = replacement;
            }
          }
        });
      }
      const localizeQuestions = await Promise.all(
        questionBank.questions.map((q) => {
          return downloadMediaAndReplaceUrls(q.title);
        })
      );
      questionBank.questions.forEach((q: any, index: number) => {
        q.title = replaceMediaUrlsWithArray(q.title, localizeQuestions[index]);
        if (q.translations) {
          for (const [key, value] of Object.entries(q?.translations)) {
            q.translations[key] = replaceMediaUrlsWithArray(
              q.translations[key],
              localizeQuestions[index]
            );
          }
        }
      });
    }
    if (practicalQuestionBank) {
      const questionBank = practicalQuestionBank[0];
      for (const question of questionBank.questions) {
        const options = await Promise.all(
          question.options.map((option: any) => {
            return downloadMediaAndReplaceUrls(option.option);
          })
        );
        question.options.forEach((option: any, index: number) => {
          option.option = replaceMediaUrlsWithArray(
            option.option,
            options[index]
          );

          if (option?.translations) {
            for (const [key, value] of Object.entries(option.translations)) {
              // option.translations[key] = options[index];
              const replacement = replaceMediaUrlsWithArray(
                option.translations[key],
                options[index]
              );
              option.translations[key] = replacement;
            }
          }
        });
      }
      const localizeQuestions = await Promise.all(
        questionBank.questions.map((q) => {
          return downloadMediaAndReplaceUrls(q.title);
        })
      );
      questionBank.questions.forEach((q: any, index: number) => {
        // q.title = localizeQuestions[index];
        q.title = replaceMediaUrlsWithArray(q.title, localizeQuestions[index]);
        if (q.translations) {
          for (const [key, value] of Object.entries(q?.translations)) {
            // q.translations[key] = localizeQuestions[index];
            const replacement = replaceMediaUrlsWithArray(
              q.translations[key],
              localizeQuestions[index]
            );
            q.translations[key] = replacement;
          }
        }
      });
    }
    if (vivaQuestionBank) {
      const questionBank = vivaQuestionBank[0];
      for (const question of questionBank.questions) {
        const options = await Promise.all(
          question.options.map((option: any) => {
            return downloadMediaAndReplaceUrls(option.option);
          })
        );
        question.options.forEach((option: any, index: number) => {
          // option.option = options[index];
          option.option = replaceMediaUrlsWithArray(
            option.option,
            options[index]
          );
          if (question.translations) {
            for (const [key, value] of Object.entries(option?.translations)) {
              // option.translations[key] = options[index];
              const replacement = replaceMediaUrlsWithArray(
                option.translations[key],
                options[index]
              );
              option.translations[key] = replacement;
            }
          }
        });
      }
      const localizeQuestions = await Promise.all(
        questionBank.questions.map((q) => {
          return downloadMediaAndReplaceUrls(q.title);
        })
      );
      questionBank.questions.forEach((q: any, index: number) => {
        // q.title = localizeQuestions[index];
        q.title = replaceMediaUrlsWithArray(q.title, localizeQuestions[index]);
        if (q.translations) {
          for (const [key, value] of Object.entries(q?.translations)) {
            // q.translations[key] = localizeQuestions[index];
            const replacement = replaceMediaUrlsWithArray(
              q.translations[key],
              localizeQuestions[index]
            );
          }
        }
        // if (q.translations) {
        //   for (const [key, value] of Object.entries(q?.translations)) {
        //     q.translations[key] = localizeQuestions[index];
        //   }
        // }
      });
    }

    batch.assessorCoordinates = batch.assessorCoordinates
      ? JSON.stringify(batch.assessorCoordinates)
      : null;
    const preparedBatch = {
      ...batch,
      id: batch._id,
      theoryQuestionBank: JSON.stringify(theoryQuestionBank),
      practicalQuestionBank: JSON.stringify(practicalQuestionBank),
      vivaQuestionBank: JSON.stringify(vivaQuestionBank),
      sscLogo: uploadLogoUrl,
    };
    const preparedCandidates = candidates.docs.map((candidate: any) => ({
      ...candidate,
      batchId: batch._id,
      id: candidate._id,
    }));
    db.transaction((tx) => {
      tx.insert(batchTable).values(preparedBatch).run();
      tx.insert(candidateTable).values(preparedCandidates).run();
    });
  } catch (error) {
    console.error("Error saving batch offline:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }
    throw error;
  }
};

const getLoadedBatches = async (assessorId: string) => {
  try {
    const batches = await db
      .select()
      .from(batchTable)
      .where(eq(batchTable.assessor, assessorId));
    return batches;
  } catch (error) {
    throw new AppError("internal server error", 500);
  }
};
const getCandidateList = async (batchId: string, assessorId: string) => {
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
const getCandidateListFromMainServer = async (
  batchId: string,
  token: string
) => {
  try {
    const response = await axios.get(
      `${process.env.MAIN_SERVER_URL}/assessor/batches/${batchId}/candidates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }
    throw new AppError("internal server error", 500);
  }
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
          inArray(candidateTable.id, candidateIds)
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
        inArray(candidateTable.id, candidateIds)
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
          inArray(candidateTable.id, candidateIds)
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
  evidence?: UploadedFile,
  comment?: string
) => {
  // Fetch batch details
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);

  if (!batch || batch.length === 0) {
    throw new AppError("Batch not found", 404);
  }

  if (batch[0].isPracticalVisibleToCandidate) {
    throw new AppError(
      "Practical is visible to candidate, can't submit practical",
      400
    );
  }

  if (!batch[0].practicalQuestionBank) {
    throw new AppError("No practical question bank found", 400);
  }

  if (!batch[0].isAssessorReached) {
    throw new AppError("Mark yourself as reached", 400);
  }

  // Fetch candidate details
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

  if (!candidate || candidate.length === 0) {
    throw new AppError("Candidate not found", 404);
  }

  if (candidate[0].practicalExamStatus === "submitted") {
    throw new AppError("Candidate already submitted", 400);
  }

  if (!candidate[0].isPresentInPractical) {
    throw new AppError("Candidate is not present in practical", 400);
  }

  if (responses.length === 0) {
    return; // Early exit if no responses
  }

  // Handle evidence upload if provided
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

  // Execute database transaction
  db.transaction((tx) => {
    // Insert exam responses
    tx.insert(examResponseTable)
      .values(
        responses.map((response: any) => ({
          questionId: response.questionId,
          answerId: "no-answer-mentioned-practical-submitted-by-assessor",
          marksObtained: response.marksObtained,
          candidateId: candidateId,
          batchId: batchId,
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          type: "PRACTICAL",
        }))
      )
      .run();
    tx.update(candidateTable)
      .set({
        practicalExamStatus: "submitted",
        isPresentInPractical: true,
      })
      .where(eq(candidateTable.id, candidateId))
      .run();
    tx.insert(commentTable).values({
      candidateId: candidateId,
      batchId: batchId,
      comment: comment,
      type: "PRACTICAL",
    });
  });
};

const submitCandidateVivaResponses = async (
  responses: any,
  candidateId: string,
  batchId: string,
  assessorId: string,
  evidence?: UploadedFile,
  comment?: string
) => {
  // Fetch batch details
  const batch = await db
    .select()
    .from(batchTable)
    .where(and(eq(batchTable.id, batchId), eq(batchTable.assessor, assessorId)))
    .limit(1);

  if (!batch || batch.length === 0) {
    throw new AppError("Batch not found", 404);
  }

  if (!batch[0].vivaQuestionBank) {
    throw new AppError("No viva question bank found", 400);
  }

  if (!batch[0].isAssessorReached) {
    throw new AppError("Mark yourself as reached", 400);
  }

  // Fetch candidate details
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

  if (!candidate || candidate.length === 0) {
    throw new AppError("Candidate not found", 404);
  }

  if (candidate[0].vivaExamStatus === "submitted") {
    throw new AppError("Candidate already submitted", 400);
  }

  if (!candidate[0].isPresentInViva) {
    throw new AppError("Candidate is not present in viva", 400);
  }

  if (responses.length === 0) {
    return; // Early exit if no responses
  }

  // Handle evidence upload if provided
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

  // Execute database transaction
  db.transaction((tx) => {
    // Insert exam responses
    if (comment) {
      tx.insert(commentTable).values({
        candidateId: candidateId,
        batchId: batchId,
        comment: comment,
        type: "VIVA",
      });
    }
    tx.insert(examResponseTable)
      .values(
        responses.map((response: any) => ({
          questionId: response.questionId,
          answerId: "no-answer-mentioned-viva-submitted-by-assessor",
          marksObtained: response.marksObtained,
          candidateId: candidateId,
          batchId: batchId,
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          type: "VIVA",
        }))
      )
      .run();

    // Update candidate exam status
    tx.update(candidateTable)
      .set({
        vivaExamStatus: "submitted",
        isPresentInViva: true,
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
            console.log(signedUrlsToUploadRandomPhotos[index].data.data.url);
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
      } else {
        adharName = adhar[0];
        adharContentType = mime.lookup(adharName) || "application/octet-stream";
      }
    }
    if (fs.existsSync(path.join(randomPhotos, "..", "..", "selfie"))) {
      const selfie = await fs.promises.readdir(
        path.join(randomPhotos, "..", "..", "selfie")
      );
      if (selfie.length === 0) {
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
    const batch = await db
      .select()
      .from(batchTable)
      .where(eq(batchTable.id, batchId));
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
    const practicalComment = await db
      .select()
      .from(commentTable)
      .where(
        and(
          eq(commentTable.candidateId, candidateId),
          eq(commentTable.batchId, batchId),
          eq(commentTable.testType, "PRACTICAL")
        )
      );
    const vivaComment = await db
      .select()
      .from(commentTable)
      .where(
        and(
          eq(commentTable.candidateId, candidateId),
          eq(commentTable.batchId, batchId),
          eq(commentTable.testType, "VIVA")
        )
      );

    if (practicalComment.length > 0) {
      finalResponses.practicalComment = practicalComment[0].comment;
    }
    if (vivaComment.length > 0) {
      finalResponses.vivaComment = vivaComment[0].comment;
    }
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
      const obj = {
        questionId: response.questionId,
      };
      // @ts-ignore

      if (batch[0]?.isPracticalVisibleToCandidate) {
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
    const assessorDetails = {
      isAssessorReached: batch[0]?.isAssessorReached,
      assessorReachedAt: batch[0]?.assessorReachedAt,
      assessorCoordinates: batch[0]?.assessorCoordinates
        ? // @ts-ignore
          JSON.parse(batch[0].assessorCoordinates)
        : {},
      assessorGroupPhoto: "",
    };
    if (batch[0].isPmkyCheckListRequired) {
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
            "pmky-checklist"
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
            "pmky-checklist"
          )
        );
        const responses = await Promise.all(
          evidences.map((evidence) => {
            return axios.get(
              `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/pmky-checklist-presigned-url`,
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
            "pmky-checklist",
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
      }
    }
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
      if (error.response?.status === 404) {
        throw new AppError("resource not found", 404);
      }
      if (error.response?.status === 400) {
        throw new AppError(
          error.response.data.message || "something went wrong",
          400
        );
      }
      throw error;
    }
  }
};

const uploadPmkyChecklistFiles = async (
  assessorId: string,
  batchId: string,
  files: UploadedFile[]
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
  if (!batch[0].isPmkyCheckListRequired) {
    throw new AppError("Pmky checklist is not required", 400);
  }
  await Promise.all(
    files.map(async (file) => {
      if (!file.mimetype.startsWith("image/")) {
        throw new AppError("Invalid file type", 400);
      }
      if (file.size > 2 * 1024 * 1024) {
        throw new AppError("File size exceeds 2MB", 400);
      }
      const ext = file.name.split(".").pop();
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
        "pmky-checklist",
        `${Date.now()}.${ext}`
      );
      await file.mv(uploadPath);
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
  getCandidateListFromMainServer,
  uploadPmkyChecklistFiles,
};
