"use server";

import { lessonService } from "@/features/lessons/services/lesson";
import { revalidateTag } from "next/cache";

export async function deleteLesson(lessonId: string) {
  const res = await lessonService.deleteLesson(lessonId);

  if (!res.result) {
    throw new Error(
      "No result in DELETE /lessons/${lessonId}: " + JSON.stringify(res)
    );
  }

  const result = res.result.message;

  revalidateTag("/courses/${courseId}/lessons");

  return { result };
}
