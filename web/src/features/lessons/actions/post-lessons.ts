"use server";

import { lessonService } from "@/features/lessons/services/lesson";
import { AddFormValues } from "@/features/lessons/types/add-form";
import { revalidateTag } from "next/cache";

export async function postLesson(courseId: string, data: AddFormValues) {
  const res = await lessonService.create(courseId, data);

  if (!res.result?.result) {
    throw new Error(
      "No result in /courses/${courseId}/lessons: " + JSON.stringify(res)
    );
  }

  const lesson = res.result.result;

  revalidateTag("/courses/${courseId}/lessons");

  return { lesson };
}
