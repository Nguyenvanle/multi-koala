import { z } from "zod";

export const AnswerBody = z.object({
  answerId: z.string().nullable(),
  answerDescription: z.string(),
  correct: z.boolean(),
});
export type AnswerBodyType = z.infer<typeof AnswerBody>;