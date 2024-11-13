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
