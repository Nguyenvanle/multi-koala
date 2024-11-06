"use server";

import { CourseResType } from "@/features/courses/types/course";
import { cookies } from "next/headers";

export async function postImageCourse(courseId: string, formData: FormData) {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No token in cookies");
  }

  const res = await fetch(
    `http://localhost:8080/courses/${courseId}/update-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error(
      "No result in /courses/${courseId}/update-image: " + JSON.stringify(res)
    );
  }

  const coursesRes: CourseResType = await res.json();

  const courses = coursesRes.result;

  return { courses };
}
