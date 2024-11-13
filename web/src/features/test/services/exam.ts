import {
  ExamAddFormBodyType,
  ExamAddFormResType,
} from "@/features/test/types/exam";
import { apiService } from "@/services/api";

export const examService = {
  async create(lessonId: string, data: ExamAddFormBodyType) {
    return await apiService.post<ExamAddFormResType>(
      `/lessons/${lessonId}/tests`,
      data
    );
  },
};
