"use server";

import { lessonService } from "@/features/lessons/services/lesson";

export async function getLesson(lessonId: string) {
  const res = await lessonService.getDetail(lessonId);

  if (!res.result?.result) {
    throw new Error(
      "No result in /lessons/${lessonId}: " + JSON.stringify(res)
    );
  }

  const lesson = res.result.result;

  return { lesson };
}
