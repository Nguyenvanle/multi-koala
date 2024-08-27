import { z } from "zod";

export const VerifyBody = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export type VerifyBodyType = z.TypeOf<typeof VerifyBody>;
