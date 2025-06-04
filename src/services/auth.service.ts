import { LoginAssessor } from "../schemas/assessor.schema";
import axios from "axios";
import { AppError } from "../utils/AppError";
import { LoginCandidate } from "../schemas/candidate.schema";
import jwt from "jsonwebtoken";
import { eq, or, and } from "drizzle-orm";
import db from "../db";
import { candidates as candidatesTable } from "../db/schema";
import fs from "fs/promises";
import path from "path";
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
    await fs.writeFile(
      path.join(__dirname, "..", "..", "token.txt"),
      response.data.data.token
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
    // const candidate = await prisma.candidate.findFirst({
    //   where: {
    //     OR: [{ id: data._id }, { enrollmentNo: data._id }],
    //     password: data.password,
    //   },
    //   select: {
    //     id: true,
    //     batchId: true,
    //   },
    // });
    // if (!candidate) {
    //   throw new AppError("invalid  credentials", 401, true);
    // }
    const result = await db
      .select({
        id: candidatesTable.id,
        batchId: candidatesTable.batchId,
        name: candidatesTable.name,
      })
      .from(candidatesTable)
      .where(
        and(
          or(
            eq(candidatesTable.id, data._id),
            eq(candidatesTable.enrollmentNo, data._id)
          ),
          eq(candidatesTable.password, data.password)
        )
      )
      .limit(1);

    const foundCandidate = result[0];

    if (!foundCandidate) {
      throw new AppError("invalid credentials", 401, true);
    }
    const token = jwt.sign(
      { _id: foundCandidate.id, batchId: foundCandidate.batchId },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    return { token, name: foundCandidate.name };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("internal server error", 500);
  }
};
export default { loginAssessor, loginCandidate };
