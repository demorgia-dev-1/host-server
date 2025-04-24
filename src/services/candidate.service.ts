import { start } from "repl";
import { PrismaClient } from "../../generated/prisma";
import { SubmitTheoryResponses } from "../schemas/candidate.schema";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();
const getMyTheoryTest = async (candidateId: string) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
    },
    select: { batch: true, isPresentInTheory: true },
  });
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
  }
  if (!candidate.isPresentInTheory) {
    throw new AppError("Your attendance is not marked", 401, true);
  }
  const batch = await prisma.batch.findFirst({
    where: { id: candidate.batch.id },
    select: { theoryQuestionBank: true },
  });
  if (!batch) {
    throw new AppError("invalid credentials", 401, true);
  }
  const questionBank = JSON.parse(batch.theoryQuestionBank);
  return questionBank;
};
const submitTheoryResponses = async (
  responses: SubmitTheoryResponses,
  candidateId: string,
  batchId: string
) => {
  const values = responses.responses.map((response) => {
    return `(${response.questionId}, ${response.answerId},${batchId}, ${candidateId},${response.startedAt}, ${response.endedAt})`;
  });
  const query = `INSERT INTO theory_response (question_id, answer_id, batch_id, candidate_id, started_at, ended_at) VALUES ${values.join(
    ","
  )} ON CONFLICT (question_id, candidate_id) DO UPDATE SET answer_id = excluded.answer_id`;
  await prisma.$executeRawUnsafe(query);
};

export default { getMyTheoryTest, submitTheoryResponses };
