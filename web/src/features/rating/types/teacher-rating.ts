import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const TeacherRatingBody = z.object({
  avgteacherRating: z.number(),
});
export const TeacherRatingsBody = z.array(TeacherRatingBody);

export const TeacherRatingRes = BaseResponseSchema.extend({
  result: TeacherRatingBody,
});
export const TeacherRatingsRes = BaseResponseSchema.extend({
  result: TeacherRatingsBody,
});

export type TeacherRatingBodyType = z.infer<typeof TeacherRatingBody>;
export type TeacherRatingsBodyType = z.infer<typeof TeacherRatingsBody>;

export type TeacherRatingResType = z.infer<typeof TeacherRatingRes>;
export type TeacherRatingsResType = z.infer<typeof TeacherRatingsRes>;
