import { UserBodyType } from "@/features/users/schema/user";
import { z } from "zod";

export const LoginResBody = z.object({
  code: z.number(),
  message: z.string(),
  result: z.object({
    token: z.string(),
    user: UserBodyType,
    authenticated: z.boolean(),
  }),
});

export type LoginResType = z.TypeOf<typeof LoginResBody>;
