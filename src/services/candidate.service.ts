import { PrismaClient } from "../../generated/prisma";
import { AppError } from "../utils/AppError";

const prisma = new PrismaClient();
const getMyTheoryTest = async (candidateId: string) => {
  const candidate = await prisma.candidate.findFirst({
    where: {
      id: candidateId,
    },
    select: { batch: true },
  });
  if (!candidate) {
    throw new AppError("invalid credentials", 401, true);
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

export default { getMyTheoryTest };
