"use server";

import { LessonDetailResponse } from "@/features/lessons/types/lessons-res";

export async function postImageLesson(lessonId: string, formData: FormData) {
  const res = await fetch(
    `http://localhost:8080/lessons/${lessonId}/update-image`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error(
      "No result in /lessons/:lessonId/update-image:" + JSON.stringify(res)
    );
  }

  const lessonRes: LessonDetailResponse = await res.json();

  const lesson = lessonRes.result;

  return { lesson };
}
