import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

const RecentEnrollBody = z.object({
  studentName: z.string(),
  studentEmail: z.string(),
  courseName: z.string(),
  process: z.number(),
  status: z.string(),
  enrollAt: z.string(),
  coursePrice: z.number(),
});
export type RecentEnrollBodyType = z.infer<typeof RecentEnrollBody>;

const RecentEnrollRes = BaseResponseSchema.extend({
  result: z.array(RecentEnrollBody),
});
export type RecentEnrollResType = z.infer<typeof RecentEnrollRes>;
