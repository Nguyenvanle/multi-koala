"use server";

import { examService } from "@/features/test/services/exam";
import { ExamUpdateFormBodyType } from "@/features/test/types/exam";
import { TestBodyType } from "@/features/test/types/test-result";
import { revalidateTag } from "next/cache";

export async function putExam(testId: string, data: ExamUpdateFormBodyType) {
  const res = await examService.update(testId, data);

  if (res.code === 200) {
    console.log("Saving test data:", res);

    revalidateTag("/lessons/${lessonId}/tests");
    return { success: true };
  } else {
    console.error("Fail to save test data:", res);
    return { success: false };
  }
}

