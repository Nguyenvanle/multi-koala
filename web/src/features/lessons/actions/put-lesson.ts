"use server";

import { lessonService } from "@/features/lessons/services/lesson";
import { EditFormType } from "@/features/lessons/types/edit-form";
import { revalidateTag } from "next/cache";

export async function putLesson(courseId: string, data: EditFormType) {
  const res = await lessonService.updateLesson(courseId, data);

  if (!res.result?.result) {
    throw new Error(
      "No result in /lessons/${lessonId}: " + JSON.stringify(res)
    );
  }

  const lesson = res.result.result;

  revalidateTag("/lessons/${lessonId}");

  return { lesson };
}
