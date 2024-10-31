import { MyReportResType } from "@/features/quiz-results/types/my-report";
import { apiService } from "@/services/api";

export const QuizResultService = {
  getAllQuizResult: async (token: string) => {
    return apiService.get<MyReportResType>(`/quiz-results/my-report`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
