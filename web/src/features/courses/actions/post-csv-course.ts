"use server";

import { courseService } from "@/features/courses/services/courses";
import { cookies } from "next/headers";

export const postCSVCourse = async (data: FormData) => {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  const res = await courseService.createCSVCourse(accessToken, data);

  if (!res.success) {
    return { success: false, message: res.message };
  }

  return { success: true, message: res.message };
};
