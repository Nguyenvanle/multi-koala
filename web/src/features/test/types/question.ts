import { AnswerBody } from "@/features/test/types/answer";
import { BaseResponseSchema } from "@/schemas/base-res";
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
  answers: z.array(AnswerBody).nullable(),
});
export type QuestionBodyType = z.infer<typeof QuestionBody>;

export const PutQuestionBody = z.object({
  questionDescription: z.string(),
  answers: z.array(z.string()),
  correctIndex: z.number(),
});
export type PutQuestionBodyType = z.infer<typeof PutQuestionBody>;
export type PostQuestionBodyType = z.infer<typeof PutQuestionBody>;

export const QuestionRes = BaseResponseSchema.extend({
  result: QuestionBody,
});
export type QuestionResType = z.infer<typeof QuestionRes>;

export type QuestionError = {
  questionId: string;
  error: string;
  errorType: "VALIDATION" | "SERVER" | "NETWORK" | "UNKNOWN";
  details?: any;
  originalData?: any;
};
