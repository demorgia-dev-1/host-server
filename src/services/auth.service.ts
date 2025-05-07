import { LoginAssessor } from "../schemas/assessor.schema";
import axios from "axios";
import { AppError } from "../utils/AppError";
import { LoginCandidate } from "../schemas/candidate.schema";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const loginAssessor = async (
  data: LoginAssessor
): Promise<{ localToken: string; serverToken: string }> => {
  try {
    const response = await axios.post(
      process.env.MAIN_SERVER_URL + "/assessor/login",
      data
    );
    const localToken = jwt.sign(
      { _id: response.data.data.assessor._id },
      process.env.JWT_SECRET!
    );
    return {
      localToken,
      serverToken: response.data.data.token,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AppError("Invalid credentials", 401);
      }
    }
    console.log("error", error);
    throw new AppError("internal server error", 500);
  }
};
export const loginCandidate = async (data: LoginCandidate) => {
  try {
    const candidate = await prisma.candidate.findFirst({
      where: {
        OR: [{ id: data._id }, { enrollmentNo: data._id }],
        password: data.password,
      },
      select: {
        id: true,
        batchId: true,
      },
    });
    if (!candidate) {
      throw new AppError("invalid  credentials", 401, true);
    }
    const token = jwt.sign(
      { _id: candidate.id, batchId: candidate.batchId },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    console.log("error", error);
    if (error instanceof AppError) {
      throw error;
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new AppError("invalid  credentials", 401, true);
      }
    }
    throw new AppError("internal server error", 500);
  }
};
export default { loginAssessor, loginCandidate };
