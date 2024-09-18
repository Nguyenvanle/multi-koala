import { z } from "zod";

export const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});
