import { z } from "zod";

export const LoginBody = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username must not exceed 20 characters." })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain letters and numbers.",
      }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
