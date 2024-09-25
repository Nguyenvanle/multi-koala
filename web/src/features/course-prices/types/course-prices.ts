import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const CoursePricesBody = z.object({
  maxCoursePrice: z.number(),
  minCoursePrice: z.number(),
});

export const CoursePricesRes = BaseResponseSchema.extend({
  result: CoursePricesBody,
});

export type CoursePricesBodyType = z.infer<typeof CoursePricesBody>;

export type CoursePricesResType = z.infer<typeof CoursePricesRes>;
