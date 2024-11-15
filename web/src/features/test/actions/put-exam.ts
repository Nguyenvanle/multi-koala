"use server";

import { examService } from "@/features/test/services/exam";
import { TestBodyType } from "@/features/test/types/test-result";
import { revalidateTag } from "next/cache";

export async function putExam(data: TestBodyType) {
  const res = await examService.update(data.testId, data);

  if (res.code === 200) {
    console.log("Saving test data:", res);

    revalidateTag("/lessons/${lessonId}/tests");
    return { success: true };
  } else {
    console.error("Fail to save test data:", res);
    return { success: false };
  }
}
