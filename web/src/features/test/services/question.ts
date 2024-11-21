import {
  PostQuestionBodyType,
  PutQuestionBodyType,
  QuestionResType,
} from "@/features/test/types/question";
import { BaseResType } from "@/schemas/base-res";
import { apiService } from "@/services/api";

export const questionService = {
  async create(testId: string, data: PostQuestionBodyType) {
    return await apiService.post<QuestionResType>(
      `/tests/${testId}/questions`,
      data
    );
  },

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

  async deleteQuestion(questionId: string) {
    return await apiService.delete<BaseResType>(`/questions/${questionId}`);
  },
};
