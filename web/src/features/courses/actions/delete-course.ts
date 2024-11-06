"use server";

import { courseService } from "@/features/courses/services/courses";
import { cookies } from "next/headers";

export async function deleteCourse(courseId: string) {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

  const res = await courseService.deleteCourse(accessToken, courseId);

  if (res.code !== 200) {
    throw new Error(
      "Action: Delete course failed:" + JSON.stringify(res, null, 2)
    );
  }

  return res.result;
}
