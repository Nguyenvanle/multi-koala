"use server";

import { lessonService } from "@/features/lessons/services/lesson";

export async function getTests(lessonId: string) {
  const res = await lessonService.getTestByLessonId(lessonId);

  if (!res.result?.result) {
    throw new Error(
      "No result in /lessons/${lessonId}/tests: " + JSON.stringify(res)
    );
  }

  const tests = res.result.result;

  return { tests };
}
