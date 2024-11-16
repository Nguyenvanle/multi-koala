import { AnswerBody } from "@/features/test/types/answer";
import { z } from "zod";

export const QuestionBody = z.object({
  questionId: z.string(),
  image: z
    .object({
      imageId: z.string(),
      imageUrl: z.string(),
    })
    .nullable(),
  questionDescription: z.string(),
  answers: z.array(AnswerBody),
});
export type QuestionBodyType = z.infer<typeof QuestionBody>;
