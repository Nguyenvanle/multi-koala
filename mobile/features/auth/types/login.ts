import { z } from "zod";

export const LoginBody = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginBodyType = z.infer<typeof LoginBody>;
