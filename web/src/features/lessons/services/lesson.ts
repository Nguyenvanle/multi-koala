import {
  AddFormResType,
  AddFormValues,
} from "@/features/lessons/types/add-form";
import {
  EditFormResType,
  EditFormType,
} from "@/features/lessons/types/edit-form";
import {
  LessonDetailResponse,
  LessonResponse,
} from "@/features/lessons/types/lessons-res";
import { TestResType } from "@/features/test/types/test-result";
import { apiService } from "@/services/api";

export const lessonService = {
  create: async (courseId: string, data: AddFormValues) => {
    return await apiService.post<AddFormResType>(
      `/courses/${courseId}/lessons`,
      data
    );
  },

  getAll: async () => {
    return await apiService.get<LessonResponse>("/lessons");
  },

  getDetail: async (lessonId: string) => {
    return await apiService.get<LessonDetailResponse>(`/lessons/${lessonId}`, {
      next: { tags: ["/lessons/${lessonId}"] },
    });
  },

  getAllByCourseId: async (courseId: string) => {
    return await apiService.get<LessonResponse>(`/courses/${courseId}/lessons`);
  },

  getDetailByCourseId: async (courseId: string, lessonId: string) => {
    return await apiService.get<LessonDetailResponse>(
      `/courses/${courseId}/lessons/${lessonId}`
    );
  },

  getTestByLessonId: async (lessonId: string) => {
    return await apiService.get<TestResType>(`/lessons/${lessonId}/tests`);
  },

  updateLesson: async (lessonId: string, data: EditFormType) => {
    return await apiService.put<EditFormResType>(`/lessons/${lessonId}`, data);
  },
};
