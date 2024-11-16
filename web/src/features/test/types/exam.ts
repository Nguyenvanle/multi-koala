import { TestBody } from "@/features/test/types/test-result";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const ExamAddFormBody = z.object({
  testDescription: z.string(),
});
export type ExamAddFormBodyType = z.infer<typeof ExamAddFormBody>;

export const ExamAddFormRes = BaseResponseSchema.extend({
  result: TestBody,
});
export type ExamAddFormResType = z.infer<typeof ExamAddFormRes>;

export const ExamUpdateFormBody = z.object({
  testDescription: z.string(),
  passingScore: z.number(),
});
export type ExamUpdateFormBodyType = z.infer<typeof ExamUpdateFormBody>;

export const ExamUpdateFormRes = BaseResponseSchema.extend({
  result: TestBody,
});
export type ExamUpdateFormResType = z.infer<typeof ExamUpdateFormRes>;
