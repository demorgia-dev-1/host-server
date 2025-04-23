import { LoginAssessor } from "../schemas/assessor.schema";
import axios from "axios";
import { AppError } from "../utils/AppError";
import { LoginCandidate } from "../schemas/candidate.schema";
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
export const loginAssessor = async (data: LoginAssessor): Promise<string> => {
  try {
    const response = await axios.post(
      process.env.MAIN_SERVER_URL + "/assessor/login",
      data
    );
    return response.data.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }
    throw new AppError("internal server error", 500);
  }
};
export const loginCandidate = async (data: LoginCandidate) => {
  try {
    const candidate = await prisma.candidate.findFirst({
      where: {
        OR: [{ id: data._id }, { enrollmentNo: data._id }],
      },
    });
    if (!candidate) {
      throw new AppError("invalid  credentials", 401, true);
    }
  } catch (error) {}
};
