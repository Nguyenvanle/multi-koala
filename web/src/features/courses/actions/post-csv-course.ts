"use server";

import { courseService } from "@/features/courses/services/courses";
import { cookies } from "next/headers";

export const postCSVCourse = async (data: FormData) => {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

  const res = await courseService.createCSVCourse(accessToken, data);

  if (!res.success) {
    throw new Error("Failed to create course from CSV: " + res.message);
  }

  return { success: true, message: res.message };
};
