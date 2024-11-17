"use server";

import { examService } from "@/features/test/services/exam";
import { PostQuestionBodyType } from "@/features/test/types/question";
import { revalidateTag } from "next/cache";

export const postQuestion = async (
  testId: string,
  data: PostQuestionBodyType
) => {
  const res = await examService.createQuestion(testId, data);

  if (res.code !== 200) {
    throw new Error(res.message);
  }

  revalidateTag("getTestByTestId");

  return {
    success: true,
    result: res.result,
  };
};
