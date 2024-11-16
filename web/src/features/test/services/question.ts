import {
  PutQuestionBodyType,
  QuestionBodyType,
  QuestionResType,
} from "@/features/test/types/question";
import { apiService } from "@/services/api";

export const questionService = {
  async update(questionId: string, data: PutQuestionBodyType) {
    return await apiService.put<QuestionResType>(
      `/questions/${questionId}`,
      data
    );
  },
};
