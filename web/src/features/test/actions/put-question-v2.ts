"use server";

import { questionService } from "@/features/test/services/question";
import { PutQuestionBodyType } from "@/features/test/types/question";

export const putQuestionV2 = async (
  questionId: string,
  data: PutQuestionBodyType
) => {
  const res = await questionService.update(questionId, data);

  if (res.result?.code !== 200) {
    return {
      success: false,
      message: res.result?.message,
    };
  }

  return {
    success: true,
    message: "Question updated successfully",
    data: res.result.result,
  };
};
