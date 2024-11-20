"use server";

import { enrollCourseService } from "@/features/enroll-courses/services/enroll-courses";
import { cookies } from "next/headers";

export async function getStudentChart() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    return { success: false, message: "No token in cookies" };
  }

  const res = await enrollCourseService.getStudentChart(accessToken);

  if (res.result?.code !== 200) {
    return { success: false, message: res.message };
  }

  return { success: true, studentChart: res.result.result };
}
