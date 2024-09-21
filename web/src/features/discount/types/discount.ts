import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const DiscountBody = z.object({
  discountApplied: z.number(),
});

export const DiscountsBody = z.array(DiscountBody);

export const DiscountRes = BaseResponseSchema.extend({
  result: DiscountBody,
});

export const DiscountsRes = BaseResponseSchema.extend({
  result: DiscountsBody,
});

export type DiscountType = z.infer<typeof DiscountBody>;

export type DiscountsType = z.infer<typeof DiscountsBody>;

export type DiscountResType = z.infer<typeof DiscountRes>;

export type DiscountsResType = z.infer<typeof DiscountsRes>;
