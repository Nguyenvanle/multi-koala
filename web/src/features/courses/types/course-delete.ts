import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const CourseDeleteBody = z.object({
  message: z.string(),
});
export type CourseDeleteBodyType = z.infer<typeof CourseDeleteBody>;

export const CourseDeleteRes = BaseResponseSchema.extend({
  result: CourseDeleteBody,
});
export type CourseDeleteResType = z.infer<typeof CourseDeleteRes>;
