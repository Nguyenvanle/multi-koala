"use server";

import { questionService } from "@/features/test/services/question";
import { revalidateTag } from "next/cache";

export const deleteQuestion = async (questionId: string) => {
  const res = await questionService.deleteQuestion(questionId);

  if (res.result?.code !== 200) {
    return { success: false, message: res.result?.message };
  }

  revalidateTag("getTestByTestId");

  return { success: true };
};
