"use server";

import { lessonService } from "@/features/lessons/services/lesson";
import { cookies } from "next/headers";

export const postCSVLessons = async (courseId: string, data: FormData) => {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  const res = await lessonService.createCSVLessons(courseId, data);

  if (!res.success) {
    return { success: false, message: res.message };
  }

  return { success: true, message: res.message };
};
