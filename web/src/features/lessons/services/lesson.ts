import {
  LessonDetailResType,
  LessonResType,
} from "@/features/lessons/types/lesson";
import { apiService } from "@/services/api";

export const lessonService = {
  getAll: async () => {
    return await apiService.get<LessonResType>("/lessons");
  },

  getDetail: async (lessonId: string) => {
    return await apiService.get<LessonDetailResType>(`/lessons/${lessonId}`);
  },

  getAllByCourseId: async (courseId: string) => {
    return await apiService.get<LessonResType>(`/courses/${courseId}/lessons`);
  },

  getDetailByCourseId: async (courseId: string, lessonId: string) => {
    return await apiService.get<LessonDetailResType>(
      `/courses/${courseId}/lessons/${lessonId}`
    );
  },
};
