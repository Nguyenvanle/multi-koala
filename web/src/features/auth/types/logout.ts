import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const LogoutBody = z.object({
  token: z.string(),
});
export const LogoutRes = BaseResponseSchema;

export type logoutBodyType = z.infer<typeof LogoutBody>;
export type LogoutResType = z.infer<typeof LogoutRes>;
