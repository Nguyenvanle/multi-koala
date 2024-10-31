import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

const MyReportBody = z.object({
  studentId: z.string(),
  studentName: z.string(),
  courseId: z.string(),
  courseName: z.string(),
  lessonId: z.string(),
  lessonName: z.string(),
  testId: z.string(),
  testName: z.string(),
  correct: z.string(),
  score: z.string(),
  dateTaken: z.string(),
});
export type MyReportBodyType = z.infer<typeof MyReportBody>;

const MyReportRes = BaseResponseSchema.extend({
  result: z.array(MyReportBody),
});
export type MyReportResType = z.infer<typeof MyReportRes>;
