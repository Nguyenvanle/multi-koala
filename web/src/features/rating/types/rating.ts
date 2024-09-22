import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const RatingBody = z.object({
  avgcourseRating: z.number(),
});
export const RatingsBody = z.array(RatingBody);

export const RatingRes = BaseResponseSchema.extend({
  result: RatingBody,
});
export const RatingsRes = BaseResponseSchema.extend({
  result: RatingsBody,
});

export type RatingBodyType = z.infer<typeof RatingBody>;
export type RatingsBodyType = z.infer<typeof RatingsBody>;

export type RatingResType = z.infer<typeof RatingRes>;
export type RatingsResType = z.infer<typeof RatingsRes>;
