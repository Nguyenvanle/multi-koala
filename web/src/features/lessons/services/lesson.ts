import {
  AddFormResType,
  AddFormValues,
} from "@/features/lessons/types/add-form";
import { DeleteLessonResType } from "@/features/lessons/types/delete-lesson";
import {
  EditFormResType,
  EditFormType,
} from "@/features/lessons/types/edit-form";
import {
  LessonDetailResponse,
  LessonResponse,
} from "@/features/lessons/types/lessons-res";
import { TestResType } from "@/features/test/types/test-result";
import { BaseResType } from "@/schemas/base-res";
import { apiService } from "@/services/api";

export const lessonService = {
  create: async (courseId: string, data: AddFormValues) => {
    return await apiService.post<AddFormResType>(
      `/courses/${courseId}/lessons`,
      data
    );
  },

  createCSVLessons: async (courseId: string, data: FormData) => {
    const res = await fetch(
      `http://localhost:8080/courses/${courseId}/lessons/csv/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result: BaseResType = await res.json();

    return {
      success: result.code === 200,
      message: result.message,
    };
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
    return await apiService.get<LessonResponse>(
      `/courses/${courseId}/lessons`,
      {
        next: { tags: ["/courses/${courseId}/lessons"] },
      }
    );
  },

  getDetailByCourseId: async (courseId: string, lessonId: string) => {
    return await apiService.get<LessonDetailResponse>(
      `/courses/${courseId}/lessons/${lessonId}`
    );
  },

  getTestByLessonId: async (lessonId: string) => {
    return await apiService.get<TestResType>(`/lessons/${lessonId}/tests`, {
      next: { tags: ["/lessons/${lessonId}/tests"] },
    });
  },

  updateLesson: async (lessonId: string, data: EditFormType) => {
    return await apiService.put<EditFormResType>(`/lessons/${lessonId}`, data);
  },

  deleteLesson: async (lessonId: string) => {
    return await apiService.delete<DeleteLessonResType>(`/lessons/${lessonId}`);
  },
};
