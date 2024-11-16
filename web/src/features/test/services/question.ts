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

  async updateImage(questionId: string, data: FormData) {
    return await fetch(
      `http://localhost:8080/questions/${questionId}/update-image`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((res) => res as QuestionResType);
  },
};