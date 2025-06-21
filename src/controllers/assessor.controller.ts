import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import assessorService from "../services/assessor.service";
import { MarkCandidateAttendance } from "../schemas/assessor.schema";
import { UploadedFile } from "express-fileupload";
import candidateService from "../services/candidate.service";
import db from "../db";
import { batches, candidates } from "../db/schema";
import { and, eq } from "drizzle-orm";
import logger from "../utils/logger";

// will fetch the batches from main server
export const getOfflineBatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.log("error", `Authorization header is missing`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.getOfflineBatches",
        method: "getOfflineBatches",
        url: req.originalUrl,
        headers: req.headers,
      });
      next(new AppError("Authorization header is missing", 401, true));
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.log("error", `Token is missing`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.getOfflineBatches",
        method: "getOfflineBatches",
        url: req.originalUrl,
        headers: req.headers,
      });
      next(new AppError("Token is missing", 401, true));
      return;
    }
    if (typeof token !== "string") {
      logger.log("error", `Token is not a string`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.getOfflineBatches",
        method: "getOfflineBatches",
        url: req.originalUrl,
        headers: req.headers,
      });
      next(new AppError("Token is not a string", 401, true));
      return;
    }
    const batches = await assessorService.getAssignedBatches(token);
    logger.log("info", `Fetched offline batches`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getOfflineBatches",
      method: "getOfflineBatches",
      url: req.originalUrl,
      headers: req.headers,
      count: batches.length,
    });
    res.status(200).json(batches);
  } catch (error) {
    logger.log("error", `Failed to fetch offline`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getOfflineBatches",
      method: "getOfflineBatches",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const saveBatchOffline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.log("error", `Authorization header is missing`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.saveBatchOffline",
        method: "saveBatchOffline",
        url: req.originalUrl,
        headers: req.headers,
      });
      next(new AppError("Authorization header is missing", 401, true));
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.log("error", `Token is missing`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.saveBatchOffline",
        method: "saveBatchOffline",
        url: req.originalUrl,
        headers: req.headers,
      });
      next(new AppError("Token is missing", 401, true));
      return;
    }
    if (typeof token !== "string") {
      logger.log("error", `Token is not a string`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.saveBatchOffline",
        method: "saveBatchOffline",
        url: req.originalUrl,
        headers: req.headers,
      });
      next(new AppError("Token is not a string", 401, true));
      return;
    }
    const batchId = req.params.batchId;
    await assessorService.saveBatchOffline(token, batchId);
    // @ts-ignore
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to save batch offline`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.saveBatchOffline",
      method: "saveBatchOffline",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
// will fetch the batches from local db
export const getLoadedBatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const assessorId = req.headers["x-assessor-id"];
    const batches = await assessorService.getLoadedBatches(
      assessorId as string
    );
    res.status(200).json(batches);
  } catch (error) {
    logger.log("error", `Failed to fetch loaded batches`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getLoadedBatches",
      method: "getLoadedBatches",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const candidateList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidates = await assessorService.getCandidateList(
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json(candidates);
  } catch (error) {
    return next(error);
  }
};
export const resetCandidates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateIds = req.body.candidates;
    await assessorService.resetCandidates(
      candidateIds,
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );

    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to reset candidates`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.resetCandidates",
      method: "resetCandidates",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const resetCandidatesPractical = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateIds = req.body.candidates;
    await assessorService.resetCandidatesPractical(
      candidateIds,
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to reset candidates practical`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.resetCandidatesPractical",
      method: "resetCandidatesPractical",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const resetCandidatesViva = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await assessorService.resetCandidatesViva(
      req.body.candidates,
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to reset candidates viva`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.resetCandidatesViva",
      method: "resetCandidatesViva",
      url: req.originalUrl,
      headers: req.headers,
    });
    return next(error);
  }
};
export const markAttendanceInTheory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await assessorService.markAttendanceInTheory(
      req.body.candidates,
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );

    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to mark attendance in theory`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.markAttendanceInTheory",
      method: "markAttendanceInTheory",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const markAttendanceInPractical = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidates = req.body.candidates;
    const batchId = req.params.batchId;
    const assessorId = req.headers["x-assessor-id"] as string;
    await assessorService.markAttendanceInPractical(
      candidates,
      batchId,
      assessorId
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to mark attendance in practical`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.markAttendanceInPractical",
      method: "markAttendanceInPractical",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const markAttendanceInViva = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidates = req.body.candidates;
    const batchId = req.params.batchId;
    const assessorId = req.headers["x-assessor-id"] as string;
    await assessorService.markAttendanceInViva(candidates, batchId, assessorId);
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to mark attendance in viva`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.markAttendanceInViva",
      method: "markAttendanceInViva",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const markAsReached = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await assessorService.markAssessorAsReached(
      req.params.batchId,
      req.headers["x-assessor-id"] as string,
      // @ts-ignore
      req?.files?.picture,
      req?.files?.adharPicture,
      req.body.location
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to mark assessor as reached`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.markAsReached",
      method: "markAsReached",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const startBatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const assessorId = req.headers["x-assessor-id"] as string;
    await assessorService.startBatch(batchId, assessorId);
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to start batch`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.startBatch",
      method: "startBatch",
      url: req.originalUrl,
      headers: req.headers,
    });
    next(error);
  }
};
export const deleteBatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ids = req.body.ids;
    await assessorService.deleteBatches(
      ids,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to delete batches`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.deleteBatches",
      method: "deleteBatches",
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    });
    next(error);
  }
};
export const getPracticalQuestionBank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionBank = await assessorService.getPracticalQuestionBank(
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json(questionBank);
  } catch (error) {
    logger.log("error", `Failed to fetch practical question bank`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getPracticalQuestionBank",
      method: "getPracticalQuestionBank",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    next(error);
  }
};
export const getVivaQuestionBank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionBank = await assessorService.getVivaQuestionBank(
      req.params.batchId,
      req.headers["x-assessor-id"] as string
    );
    res.status(200).json(questionBank);
  } catch (error) {
    logger.log("error", `Failed to fetch viva question bank`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getVivaQuestionBank",
      method: "getVivaQuestionBank",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    next(error);
  }
};
export const submitCandidatePracticalResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const candidateId = req.params.candidateId;
    const assessorId = req.headers["x-assessor-id"] as string;
    if (!req.body?.responses) {
      logger.log("error", `Responses are required`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.submitCandidatePracticalResponses",
        method: "submitCandidatePracticalResponses",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("responses are required", 400, true));
    }
    req.body.responses = JSON.parse(req.body.responses);
    if (!Array.isArray(req.body.responses)) {
      logger.log("error", `Responses should be an array`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.submitCandidatePracticalResponses",
        method: "submitCandidatePracticalResponses",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("responses should be an array", 400, true));
    }
    // @ts-ignore
    let videos: UploadedFile[] = req?.files?.videos;
    if (!videos || !Array.isArray(videos)) {
      videos = videos ? [videos] : [];
    }
    const responses = req.body.responses.map(
      (response: Record<string, any>) => {
        if (
          !response.questionId ||
          response.partialMarks === undefined ||
          !Array.isArray(response.partialMarks) ||
          response.partialMarks.length === 0 ||
          response.partialMarks.some(
            (partialMark: any) =>
              partialMark.marksObtained === undefined ||
              partialMark.marksObtained === null ||
              partialMark.marksObtained < 0 ||
              !partialMark.answerId ||
              partialMark.answerId === undefined ||
              partialMark.answerId === null
          )
        ) {
          logger.log("error", `invalid request body`, {
            //  @ts-ignore
            requestId: req.requestId,
            layer: "assessor.controller.submitCandidatePracticalResponses",
            method: "submitCandidatePracticalResponses",
            url: req.originalUrl,
            headers: req.headers,
          });
          throw new AppError("invalid request body", 400, true);
        }
        return {
          questionId: response.questionId,
          partialMarks: JSON.stringify(response.partialMarks),
        };
      }
    );

    await assessorService.submitCandidatePracticalResponses(
      responses,
      candidateId,
      batchId,
      assessorId,
      videos,
      req.body.comment
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to submit candidate practical responses`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.submitCandidatePracticalResponses",
      method: "submitCandidatePracticalResponses",
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    });
    next(error);
  }
};
export const submitCandidateVivaResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const candidateId = req.params.candidateId;
    const assessorId = req.headers["x-assessor-id"] as string;
    if (!req.body?.responses) {
      logger.log("error", `Responses are required`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.submitCandidateVivaResponses",
        method: "submitCandidateVivaResponses",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("responses are required", 400, true));
    }
    req.body.responses = JSON.parse(req.body.responses);
    if (!Array.isArray(req.body.responses)) {
      logger.log("error", `Responses should be an array`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.submitCandidateVivaResponses",
        method: "submitCandidateVivaResponses",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("responses should be an array", 400, true));
    }
    const responses = req.body.responses.map(
      (response: Record<string, any>) => {
        if (
          !response.questionId ||
          response.marksObtained === undefined ||
          response.marksObtained === null ||
          response.marksObtained < 0
        ) {
          logger.log("error", `questionId and marksObtained are required`, {
            //  @ts-ignore
            requestId: req.requestId,
            layer: "assessor.controller.submitCandidateVivaResponses",
            method: "submitCandidateVivaResponses",
            url: req.originalUrl,
            headers: req.headers,
          });
          throw new AppError(
            "questionId and marksObtained are required",
            400,
            true
          );
        }
        return {
          questionId: response.questionId,
          marksObtained: response.marksObtained,
        };
      }
    );
    // @ts-ignore
    const video: UploadedFile = req?.files?.video;
    await assessorService.submitCandidateVivaResponses(
      responses,
      candidateId,
      batchId,
      assessorId,
      video,
      req.body.comment
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to submit candidate viva responses`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.submitCandidateVivaResponses",
      method: "submitCandidateVivaResponses",
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    });
    next(error);
  }
};
export const syncCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const candidateId = req.params.candidateId;
    if (!batchId || !candidateId) {
      logger.log("error", `batchId and candidateId are required`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.syncCandidate",
        method: "syncCandidate",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("batchId and candidateId are required", 400));
    }
    await assessorService.syncCandidate(
      batchId,
      candidateId,
      req.headers["x-server-auth-token"] as string
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to sync candidate`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.syncCandidate",
      method: "syncCandidate",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    next(error);
  }
};
export const getCandidateListFromMainServer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const list = await assessorService.getCandidateListFromMainServer(
      batchId,
      req.headers["x-server-auth-token"] as string
    );
    res.status(200).json(list);
  } catch (error) {
    logger.log("error", `Failed to fetch candidate list from main server`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getCandidateListFromMainServer",
      method: "getCandidateListFromMainServer",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    return next(error);
  }
};
export const uploadPmkyChecklistFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let files: any = req?.files;
    if (!files) {
      logger.log("error", `Files are required`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadPmkyChecklistFiles",
        method: "uploadPmkyChecklistFiles",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("files are required", 400, true));
    }
    const data = Object.keys(files).map((key) => {
      return {
        files: Array.isArray(files[key]) ? files[key] : [files[key]],
        questionId: key,
      };
    });
    if (data.length === 0) {
      logger.log("error", `Files are required`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadPmkyChecklistFiles",
        method: "uploadPmkyChecklistFiles",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("files are required", 400, true));
    }
    if (data.length > 1) {
      logger.log("error", `Only one file is allowed`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadPmkyChecklistFiles",
        method: "uploadPmkyChecklistFiles",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("only one file is allowed", 400, true));
    }
    await assessorService.uploadPmkyChecklistFiles(
      req.headers["x-assessor-id"] as string,
      req.params.batchId,
      // @ts-ignore
      data[0]
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to upload PMKY checklist files`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.uploadPmkyChecklistFiles",
      method: "uploadPmkyChecklistFiles",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    return next(error);
  }
};
export const getPmkyChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const assessorId = req.headers["x-assessor-id"] as string;
    const pmkyChecklist = await assessorService.getPmkyChecklist(
      batchId,
      assessorId
    );
    res.status(200).json(pmkyChecklist);
  } catch (error) {
    logger.log("error", `Failed to fetch PMKY checklist`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.getPmkyChecklist",
      method: "getPmkyChecklist",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    return next(error);
  }
};
export const submitPmkyChecklist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const assessorId = req.headers["x-assessor-id"] as string;
    await assessorService.submitPmkyChecklist(
      batchId,
      assessorId,
      req.body.responses
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to submit PMKY checklist`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.submitPmkyChecklist",
      method: "submitPmkyChecklist",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    return next(error);
  }
};
export const uploadCandidatePracticalOnboadingFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const candidateId = req.params.candidateId;
    const assessorId = req.headers["x-assessor-id"] as string;

    await assessorService.uploadCandidatePracticalOnboardingFiles(
      batchId,
      candidateId,
      assessorId,
      // @ts-ignore
      req?.files?.adhar,
      // @ts-ignore
      req?.files?.photo
    );
    res.status(200).json({});
  } catch (error) {
    logger.log(
      "error",
      `Failed to upload candidate practical onboarding files`,
      {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadCandidatePracticalOnboadingFiles",
        method: "uploadCandidatePracticalOnboadingFiles",
        url: req.originalUrl,
        headers: req.headers,
        params: req.params,
      }
    );
    return next(error);
  }
};
const uploadRandomPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const batchId = req.params.batchId;
    const candidateId = req.params.candidateId;
    const assessorId = req.headers["x-assessor-id"] as string;
    const batch = await db
      .select()
      .from(batches)
      .where(and(eq(batches.id, batchId), eq(batches.assessor, assessorId)));
    if (batch.length === 0) {
      logger.log("error", `Batch not found`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadRandomPhotos",
        method: "uploadRandomPhotos",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("batch not found", 404, true));
    }
    const candidate = await db
      .select()
      .from(candidates)
      .where(
        and(eq(candidates.id, candidateId), eq(candidates.batchId, batchId))
      );
    if (candidate.length === 0) {
      logger.log("error", `Candidate not found`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadRandomPhotos",
        method: "uploadRandomPhotos",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("candidate not found", 404, true));
    }
    // @ts-ignore
    const photo = req.files.photo;
    if (!photo) {
      logger.log("error", `Files are required`, {
        //  @ts-ignore
        requestId: req.requestId,
        layer: "assessor.controller.uploadRandomPhotos",
        method: "uploadRandomPhotos",
        url: req.originalUrl,
        headers: req.headers,
      });
      return next(new AppError("files are required", 400, true));
    }

    await candidateService.uploadRandomPhoto(
      candidateId,
      // @ts-ignore
      photo,
      batchId,
      "PRACTICAL",
      true
    );
    res.status(200).json({});
  } catch (error) {
    logger.log("error", `Failed to upload random photos`, {
      //  @ts-ignore
      requestId: req.requestId,
      layer: "assessor.controller.uploadRandomPhotos",
      method: "uploadRandomPhotos",
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
    });
    return next(error);
  }
};
export default {
  getOfflineBatches,
  saveBatchOffline,
  getLoadedBatches,
  markAttendanceInTheory,
  markAttendanceInPractical,
  markAttendanceInViva,
  candidateList,
  resetCandidates,
  markAsReached,
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
  getPmkyChecklist,
  uploadCandidatePracticalOnboadingFiles,
  uploadRandomPhotos,
};
