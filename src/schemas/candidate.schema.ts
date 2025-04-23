import { z } from "zod";
export const loginCandidateSchema = z.object({
  body: z.object({
    _id: z.string(),
    password: z.string(),
  }),
});
export type LoginCandidate = z.infer<typeof loginCandidateSchema>["body"];
