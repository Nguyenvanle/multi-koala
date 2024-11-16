"use server";

import { questionService } from "@/features/test/services/question";
import { revalidateTag } from "next/cache";

export const putImage = async (questionId: string, data: FormData) => {
  const res = await questionService.updateImage(questionId, data);
  if (res.code !== 200) {
    throw new Error(res.message);
  }
  revalidateTag("/lessons/${lessonId}/tests");

  return {
    success: true,
    result: res.result,
  };
};
