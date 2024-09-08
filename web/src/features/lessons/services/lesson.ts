import {
  LessonDetailResponse,
  LessonResponse,
} from "@/features/lessons/types/lessons-res";
import { apiService } from "@/services/api";

export const lessonService = {
  getAll: async () => {
    return await apiService.get<LessonResponse>("/lessons");
  },

  getDetail: async (lessonId: string) => {
    return await apiService.get<LessonDetailResponse>(`/lessons/${lessonId}`);
  },

  getAllByCourseId: async (courseId: string) => {
    return await apiService.get<LessonResponse>(`/courses/${courseId}/lessons`);
  },

  getDetailByCourseId: async (courseId: string, lessonId: string) => {
    return await apiService.get<LessonDetailResponse>(
      `/courses/${courseId}/lessons/${lessonId}`
    );
  },
};
