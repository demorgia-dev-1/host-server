import { z } from "zod";
export const loginAssessorSchema = z.object({
  body: z.object({
    _id: z.string(),
    password: z.string(),
  }),
});
export type LoginAssessor = z.infer<typeof loginAssessorSchema>["body"];
