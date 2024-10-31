"use server";

import { EnrollCourseService } from "@/features/enroll-courses/services/enroll-courses";
import { cookies } from "next/headers";

export async function getRecentEnroll() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

  const res = await EnrollCourseService.getAllRecentEnroll(accessToken);

  if (!res.result?.result) {
    throw new Error(
      "No result in /enroll-courses/recently-student-enrolled-my-courses:" +
        JSON.stringify(res)
    );
  }

  const student = res.result.result;

  return { student };
}
