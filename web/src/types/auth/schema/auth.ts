import { z } from "zod";

export const AuthResponse = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      username: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type AuthResponseType = z.TypeOf<typeof AuthResponse>;

// Use AuthResponse for both RegisterRes and LoginRes
export const RegisterRes = AuthResponse;
export type RegisterResType = AuthResponseType;

export const LoginRes = AuthResponse;
export type LoginResType = AuthResponseType;

// Define schema for slide session data
export const SlideSessionBody = z.object({}).strict();
export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

// Use AuthResponse for SlideSessionRes
export const SlideSessionRes = AuthResponse;
export type SlideSessionResType = AuthResponseType;
