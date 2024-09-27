import { UserBodyType } from "@/features/users/schema/user";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const RefreshBody = z.object({
  token: z.string(),
});

export const RefreshRes = BaseResponseSchema.extend({
  result: z.object({
    token: z.string(),
    user: UserBodyType,
    authenticated: z.boolean(),
  }),
});

export type RefreshBodyType = z.infer<typeof RefreshBody>;
export type RefreshResType = z.infer<typeof RefreshRes>;
