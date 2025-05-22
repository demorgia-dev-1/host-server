import { z } from "zod";
export const loginCandidateSchema = z.object({
  body: z.object({
    _id: z.string(),
    password: z.string(),
  }),
});
export const submitTheoryResponsesSchema = z.object({
  body: z.object({
    responses: z.array(
      z.object({
        questionId: z.string(),
        answerId: z.string(),
        startedAt: z.string(),
        endedAt: z.string(),
      })
    ),
  }),
});
export const submitFeedbackFormSchema = z.object({
  body: z.object({
    feedbacks: z.array(
      z.object({
        questionId: z.string(),
        response: z.enum(["very poor", "poor", "average", "good", "very good"]),
      })
    ),
  }),
});
export type SubmitTheoryResponses = z.infer<
  typeof submitTheoryResponsesSchema
>["body"];
export type LoginCandidate = z.infer<typeof loginCandidateSchema>["body"];
