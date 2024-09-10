import axios from "axios";
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

export const login = async (data: LoginBodyType) => {
  try {
    const validatedData = LoginBody.parse(data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      validatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    //Xử lý phản hồi từ API
    return response.data;
  } catch (error) {
    //Xử lý lỗi xác thực hoặc lỗi từ API
    if (error instanceof z.ZodError) {
      //Nếu lỗi xác thực từ Zod
      console.error("Validation Error:", error.errors);
      throw new Error("Invalid input data!");
    } else if (axios.isAxiosError(error)) {
      //Nếu lỗi xác thực từ zod
      console.error("API Error:", error.response?.data);
      throw new Error("Failed to Sign in. Please try again.");
    } else {
      //Các lỗi khác
      console.error("Unexpected:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};
