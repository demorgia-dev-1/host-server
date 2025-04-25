import { z } from "zod";
export const loginAssessorSchema = z.object({
  body: z.object({
    _id: z.string(),
    password: z.string(),
  }),
});
export const markAssessorAsReachedSchema = z.object({
  body: z.object({
    location: z
      .object({
        lat: z.number(),
        long: z.number(),
      })
      .strict()
      .optional(),
  }),
});
export const markCandidateAttendanceSchema = z.object({
  body: z.object({
    candidates: z.array(z.string()),
  }),
});
export const resetCandidateTheoryTestSchema = z.object({
  body: z.object({
    candidates: z.array(z.string()),
  }),
});
export type LoginAssessor = z.infer<typeof loginAssessorSchema>["body"];
export type MarkAssessorAsReached = z.infer<
  typeof markAssessorAsReachedSchema
>["body"];
export type MarkCandidateAttendance = z.infer<
  typeof markCandidateAttendanceSchema
>["body"];
export type ResetCandidateTheoryTest = z.infer<
  typeof resetCandidateTheoryTestSchema
>["body"];
