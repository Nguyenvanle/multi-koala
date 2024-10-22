"use server";

import { courseService } from "@/features/courses/services/courses";
import { cookies } from "next/headers";

export async function getTopCourses() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

  const res = await courseService.getMyPerformingCourses(accessToken);

  if (!res.result?.result) {
    throw new Error(
      "No result in /courses/my-performing-courses: " + JSON.stringify(res)
    );
  }

  const courses = res.result.result;

  return { courses };
}
