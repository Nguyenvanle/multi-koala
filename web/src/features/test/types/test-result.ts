import { QuestionBody } from "@/features/test/types/question";
import { BaseResponseSchema } from "@/schemas/base-res";
import { array, z } from "zod";

export const TestBody = z.object({
  testId: z.string(),
  testDescription: z.string(),
  passingScore: z.number(),
  status: z.enum(["IN_EDITING", "PUBLISHED", "ARCHIVED"]),
  questions: z.array(QuestionBody),
  deleted: z.boolean(),
  testUploadedAt: z.string().nullable(),
});
export type TestBodyType = z.infer<typeof TestBody>;

export const TestRes = BaseResponseSchema.extend({
  result: array(TestBody),
});
export type TestResType = z.infer<typeof TestRes>;

export const TestDetailRes = BaseResponseSchema.extend({
  result: TestBody,
});
export type TestDetailResType = z.infer<typeof TestDetailRes>;