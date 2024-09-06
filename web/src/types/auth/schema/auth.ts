import { z } from "zod";

export const AuthResponse = z.object({
  code: z.number(), // Chỉnh sửa thành number thay vì string
  message: z.string(),
  result: z.object({
    userId: z.string(),
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    userBirth: z.string(), // Giả định là string, nếu cần có thể sử dụng z.date()
    userBio: z.string(),
    userHometown: z.string(),
    email: z.string().email(), // Kiểm tra định dạng email
    image: z.object({
      imageId: z.string(),
      imageUrl: z.string(),
    }),
    roles: z.array(
      z.object({
        roleName: z.string(),
        roleDescription: z.string(),
        permissions: z.array(z.any()), // Định nghĩa rõ hơn nếu biết cấu trúc permissions
      })
    ),
    deleted: z.boolean(), // Kiểu boolean cho trường deleted
  }),
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
