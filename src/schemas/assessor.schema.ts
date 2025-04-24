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
export type LoginAssessor = z.infer<typeof loginAssessorSchema>["body"];
export type MarkAssessorAsReached = z.infer<
  typeof markAssessorAsReachedSchema
>["body"];
