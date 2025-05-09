import { UploadedFile } from "express-fileupload";
import { SubmitTheoryResponses } from "../schemas/candidate.schema";
import { AppError } from "../utils/AppError";
import path from "path";
import { sql } from "drizzle-orm";
import db from "../db";
import {
  candidates as candidatesTable,
  batches as batchTable,
} from "../db/schema";
import { eq } from "drizzle-orm";
const uploadOnboardingEvidence = async (
  candidateId: string,
  location: { long: number; lat: number },
  adhar: UploadedFile,
  selfie: UploadedFile
) => {
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));

  const batch = await db
    .select()
    .from(batchTable)
    .where(eq(batchTable.id, candidate[0].batchId));
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate[0].isPresentInTheory) {
    throw new AppError(
      "Your attendance is not marked in theory exam",
      401,
      true
    );
  }
  const updatedCandidateData: any = {
    isEvidanceUploaded: true,
  };
  if (batch[0].isCandidateLocationRequired) {
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
  if (batch[0].isCandidateAdharRequired) {
    if (!adhar) {
      throw new AppError("Adhar is required", 400);
    }
    const ext = path.extname(adhar.name);
    const adharPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "batches",
      batch[0].id,
      "evidences",
      "candidates",
      candidateId,
      "adhar",
      `adhar${ext}`
    );
    if (!adhar.mimetype.startsWith("image/")) {
      throw new AppError("Invalid file type", 400);
    }
    if (adhar.size > 10 * 1024 * 1024) {
      throw new AppError("File size exceeds 10MB", 400);
    }
    await adhar.mv(adharPath);
    updatedCandidateData["adharPicture"] = adharPath;
  }
  if (batch[0].isCandidateSelfieRequired) {
    if (!selfie) {
      throw new AppError("Selfie is required", 400);
    }
    const ext = path.extname(selfie.name);
    const selfiePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      "batches",
      batch[0].id,
      "evidences",
      "candidates",
      candidateId,
      "selfie",
      `selfie${ext}`
    );
    if (!selfie.mimetype.startsWith("image/")) {
      throw new AppError("Invalid file type", 400);
    }
    if (selfie.size > 10 * 1024 * 1024) {
      throw new AppError("File size exceeds 10MB", 400);
    }

    await selfie.mv(selfiePath);
    updatedCandidateData["candidateSelfie"] = selfiePath;
    updatedCandidateData["candidateSelfieTakenAt"] = new Date().toISOString();
  }

  await db
    .update(candidatesTable)
    .set(updatedCandidateData)
    .where(eq(candidatesTable.id, candidateId));
};

const getMyTheoryTest = async (candidateId: string) => {
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate[0].isEvidanceUploaded) {
    throw new AppError("Your evidence is not uploaded", 401, true);
  }
  if (candidate[0].theoryExamStatus !== "notStarted") {
    const msg =
      candidate[0].theoryExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is already started";
    throw new AppError(msg, 401, true);
  }
  const batch = await db
    .select()
    .from(batchTable)
    .where(eq(batchTable.id, candidate[0].batchId));
  const questionBank = batch[0].theoryQuestionBank
    ? JSON.parse(batch[0].theoryQuestionBank)
    : null;
  if (!questionBank) {
    throw new AppError("Question bank not found", 404);
  }

  await db
    .update(candidatesTable)
    .set({
      theoryExamStatus: "started",
      theoryStartedAt: new Date().toISOString(),
    })
    .where(eq(candidatesTable.id, candidateId));
  // randomize questions
  const questions = questionBank[0].questions;
  if (questions) {
    questions.forEach((question: any) => {
      const options = question.options;
      if (options) {
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
      }
      question.options = options;
    });
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }
  questionBank[0].questions = questions;
  return questionBank;
};
const getMyPracticalTest = async (candidateId: string) => {
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));

  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate[0].isPresentInPractical) {
    throw new AppError(
      "your attendance is not marked in practical exam",
      401,
      true
    );
  }
  if (candidate[0].practicalExamStatus !== "notStarted") {
    const msg =
      candidate[0].practicalExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is already started";
    throw new AppError(msg, 401, true);
  }
  const batch = await db
    .select()
    .from(batchTable)
    .where(eq(batchTable.id, candidate[0].batchId));

  const questionBank = batch[0].practicalQuestionBank
    ? JSON.parse(batch[0].practicalQuestionBank)
    : null;
  if (!questionBank) {
    throw new AppError("Question bank not found", 404);
  }
  // randomize questions
  const questions = questionBank[0]?.questions;
  if (questions) {
    questions.forEach((question: any) => {
      const options = question.options;
      if (options) {
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
      }
      question.options = options;
    });
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    questionBank[0].questions = questions;
  }

  await db
    .update(candidatesTable)
    .set({
      practicalExamStatus: "started",
      practicalStartedAt: new Date().toISOString(),
    })
    .where(eq(candidatesTable.id, candidateId));
  return questionBank;
};
const submitTheoryResponses = async (
  responses: SubmitTheoryResponses,
  candidateId: string,
  batchId: string
) => {
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));

  if (!candidate || candidate.length === 0) {
    throw new AppError("invalid credentials", 401, true);
  }

  const candidateData = candidate[0];

  if (!candidateData.isPresentInTheory) {
    throw new AppError(
      "Your attendance is not marked in theory exam",
      401,
      true
    );
  }

  if (candidateData.theoryExamStatus !== "started") {
    const msg =
      candidateData.theoryExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is not started";
    throw new AppError(msg, 401, true);
  }

  if (responses.responses.length === 0) {
    throw new AppError("No responses found", 400);
  }

  const valuesSql = responses.responses.map(
    (r) =>
      sql`(${r.questionId}, ${r.answerId}, ${batchId}, ${candidateId}, ${r.startedAt}, ${r.endedAt}, 'THEORY')`
  );

  db.run(sql`
    INSERT INTO exam_response (
      questionId, answerId, batchId, candidateId, startedAt, endedAt, type
    )
    VALUES ${sql.join(valuesSql, sql`, `)}
    ON CONFLICT(questionId, candidateId) DO UPDATE SET
      answerId = excluded.answerId,
      batchId = excluded.batchId,
      startedAt = excluded.startedAt,
      endedAt = excluded.endedAt,
      type = excluded.type;
  `);
};
const submitTheoryTest = async (candidateId: string, batchId: string) => {
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate[0].isPresentInTheory) {
    throw new AppError(
      "Your attendance is not marked in theory exam",
      401,
      true
    );
  }
  if (candidate[0].theoryExamStatus !== "started") {
    const msg =
      candidate[0].theoryExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is not started";
    throw new AppError(msg, 401, true);
  }
  await db
    .update(candidatesTable)
    .set({
      theoryExamStatus: "submitted",
      theorySubmittedAt: new Date().toISOString(),
    })
    .where(eq(candidatesTable.id, candidateId));
};
const uploadRandomVideo = async (
  candidateId: string,
  video: UploadedFile,
  batchId: string,
  testType: "THEORY" | "PRACTICAL" | "VIVA"
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(eq(batchTable.id, batchId));

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isCandidateVideoRequired) {
    throw new AppError("Video upload is not required for this batch", 400);
  }
  if (!video) {
    throw new AppError("Video is required", 400);
  }

  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));
  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (testType === "THEORY" && !candidate[0].isPresentInTheory) {
    throw new AppError("Your attendance is not marked in theory exam", 401);
  }
  if (testType === "PRACTICAL" && !candidate[0].isPresentInPractical) {
    throw new AppError("Your attendance is not marked in practical exam", 401);
  }
  if (
    testType === "THEORY" &&
    (candidate[0].theoryExamStatus === "notStarted" ||
      candidate[0].theoryExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }
  if (
    testType === "PRACTICAL" &&
    (candidate[0].practicalExamStatus === "notStarted" ||
      candidate[0].practicalExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }
  const ext = path.extname(video.name);
  const videoPath = path.join(
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
    testType,
    `${Date.now()}${ext}`
  );
  if (!video.mimetype.startsWith("video/")) {
    throw new AppError("Invalid file type", 400);
  }
  if (video.size > 200 * 1024 * 1024) {
    throw new AppError("File size exceeds 200MB", 400);
  }
  await video.mv(videoPath);
};
const uploadRandomPhoto = async (
  candidateId: string,
  photo: UploadedFile,
  batchId: string,
  testType: "THEORY" | "PRACTICAL" | "VIVA"
) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(eq(batchTable.id, batchId));

  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  if (!batch[0].isCandidatePhotosRequired) {
    throw new AppError("Video upload is not required for this batch", 400);
  }
  if (!photo) {
    throw new AppError("Photo is required", 400);
  }

  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));

  if (!candidate) {
    throw new AppError("Candidate not found", 404);
  }
  if (testType === "THEORY" && !candidate[0].isPresentInTheory) {
    throw new AppError("Your attendance is not marked in theory exam", 401);
  }
  if (testType === "PRACTICAL" && !candidate[0].isPresentInPractical) {
    throw new AppError("Your attendance is not marked in practical exam", 401);
  }
  if (
    testType === "THEORY" &&
    (candidate[0].theoryExamStatus === "notStarted" ||
      candidate[0].theoryExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }
  if (
    testType === "PRACTICAL" &&
    (candidate[0].practicalExamStatus === "notStarted" ||
      candidate[0].practicalExamStatus === "submitted")
  ) {
    throw new AppError("Your exam is not started or already submitted", 401);
  }

  const ext = path.extname(photo.name);
  const photoPath = path.join(
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
    testType,
    `${Date.now()}${ext}`
  );
  if (!photo.mimetype.startsWith("image/")) {
    throw new AppError("Invalid file type", 400);
  }
  if (photo.size > 10 * 1024 * 1024) {
    throw new AppError("File size exceeds 10MB", 400);
  }
  await photo.mv(photoPath);
};
const submitPracticalResponses = async (
  responses: SubmitTheoryResponses,
  candidateId: string,
  batchId: string
) => {
  // Fetch the candidate info
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));

  // Ensure the candidate exists
  if (!candidate || candidate.length === 0) {
    throw new AppError("invalid credentials", 401, true);
  }

  // Ensure the candidate is marked as present in practical exam
  if (!candidate[0].isPresentInPractical) {
    throw new AppError(
      "Your attendance is not marked in practical exam",
      401,
      true
    );
  }

  // Ensure the exam status is neither submitted nor not started
  if (
    candidate[0].practicalExamStatus === "submitted" ||
    candidate[0].practicalExamStatus === "notStarted"
  ) {
    const msg =
      candidate[0].practicalExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is not started";
    throw new AppError(msg, 401, true);
  }

  // Ensure there are practical responses to submit
  if (!responses.responses || responses.responses.length === 0) {
    throw new AppError("No responses provided", 400, true);
  }

  // Prepare the SQL query values for batch insertion
  const values = responses.responses
    .map((response) => {
      return `('${response.questionId}', '${response.answerId}','${batchId}', '${candidateId}','${response.startedAt}', '${response.endedAt}', 'PRACTICAL')`;
    })
    .join(", "); // Join them into a single string for the query

  // Insert or replace the responses into the `exam_response` table
  const query = `
    INSERT OR REPLACE INTO exam_response 
    (questionId, answerId, batchId, candidateId, startedAt, endedAt, type) 
    VALUES ${values}
  `;

  // Run the query asynchronously and await its completion
  await db.run(sql.raw(query));
};

const submitPracticalTest = async (candidateId: string, batchId: string) => {
  const candidate = await db
    .select()
    .from(candidatesTable)
    .where(eq(candidatesTable.id, candidateId));
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate[0].isPresentInPractical) {
    throw new AppError(
      "Your attendance is not marked in practical exam",
      401,
      true
    );
  }
  if (
    candidate[0].practicalExamStatus === "submitted" ||
    candidate[0].practicalExamStatus === "notStarted"
  ) {
    const msg =
      candidate[0].practicalExamStatus === "submitted"
        ? "Your exam is already submitted"
        : "Your exam is not started";
    throw new AppError(msg, 401, true);
  }

  await db
    .update(candidatesTable)
    .set({
      practicalExamStatus: "submitted",
      practicalSubmittedAt: new Date().toISOString(),
    })
    .where(eq(candidatesTable.id, candidateId));
};
const getBatchDetails = async (batchId: string) => {
  const batch = await db
    .select()
    .from(batchTable)
    .where(eq(batchTable.id, batchId));
  if (!batch) {
    throw new AppError("Batch not found", 404);
  }
  return batch[0];
};
export default {
  getMyTheoryTest,
  submitTheoryResponses,
  submitTheoryTest,
  uploadOnboardingEvidence,
  uploadRandomVideo,
  uploadRandomPhoto,
  submitPracticalResponses,
  submitPracticalTest,
  getMyPracticalTest,
  getBatchDetails,
};
