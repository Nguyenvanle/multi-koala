import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const IntrospectBody = z.object({
  token: z.string(),
});
export const IntrospectRes = BaseResponseSchema.extend({
  result: z.object({
    valid: z.boolean(),
  }),
});

export type IntrospectBodyType = z.infer<typeof IntrospectBody>;
export type IntrospectResType = z.infer<typeof IntrospectRes>;
