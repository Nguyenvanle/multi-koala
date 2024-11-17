"use server";

import { lessonService } from "@/features/lessons/services/lesson";
import { examService } from "@/features/test/services/exam";

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

export async function getTestByTestId(testId: string) {
  const res = await examService.getTestByTestId(testId);

  if (res.result?.code !== 200) {
    return {
      success: false,
      message: res.result?.message,
    };
  }

  return {
    success: true,
    message: "Test get successfully",
    data: res.result.result,
  };
}


