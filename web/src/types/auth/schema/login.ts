import { z } from "zod";

export const LoginBody = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
