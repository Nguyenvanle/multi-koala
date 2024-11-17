import {
  ExamAddFormBodyType,
  ExamAddFormResType,
  ExamUpdateFormBodyType,
  ExamUpdateFormResType,
} from "@/features/test/types/exam";
import {
  PostQuestionBodyType,
  QuestionBodyType,
  QuestionResType,
} from "@/features/test/types/question";
import {
  TestBodyType,
  TestDetailResType,
  TestResType,
} from "@/features/test/types/test-result";
import { apiService } from "@/services/api";

export const examService = {
  async getTestByTestId(testId: string) {
    return await apiService.get<TestDetailResType>(`/tests/${testId}`, {
      next: { tags: ["getTestByTestId"] },
    });
  },

  async create(lessonId: string, data: ExamAddFormBodyType) {
    return await apiService.post<ExamAddFormResType>(
      `/lessons/${lessonId}/tests`,
      data
    );
  },

  async createQuestion(testId: string, data: PostQuestionBodyType) {
    return await apiService.post<QuestionResType>(
      `/tests/${testId}/questions`,
      data
    );
  },

  async update(testId: string, data: ExamUpdateFormBodyType) {
    return await apiService.put<ExamUpdateFormResType>(
      `/tests/${testId}`,
      data
    );
  },
};
