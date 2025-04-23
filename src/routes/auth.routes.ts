import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { loginAssessorSchema } from "../schemas/assessor.schema";
import { loginAssessor } from "../controllers/auth.controller";
const router = express.Router();
router
  .route("/assessor-login")
  .post(validateRequest(loginAssessorSchema), loginAssessor);
export default router;
