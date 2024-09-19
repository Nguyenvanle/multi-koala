import { z } from "zod";

export const BaseResponse = z.object({
  code: z.string(),
  message: z.string(),
});
