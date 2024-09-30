import { z } from "zod";

export const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export type BaseResType = z.infer<typeof BaseResponseSchema>;
