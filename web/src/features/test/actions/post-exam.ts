"use server";

import { examService } from "@/features/test/services/exam";
import { ExamAddFormBodyType } from "@/features/test/types/exam";
import { revalidateTag } from "next/cache";

export async function postExam(lessonId: string, data: ExamAddFormBodyType) {
  const res = await examService.create(lessonId, data);

  if (!res.result?.result) {
    throw new Error(
      "No result in /lessons/${lessonId}/tests: " + JSON.stringify(res)
    );
  }

  const exam = res.result.result;

  revalidateTag("/lessons/${lessonId}/tests");

  return { exam };
}
