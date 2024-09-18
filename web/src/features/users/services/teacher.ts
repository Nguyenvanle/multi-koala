import { CourseResType } from "@/features/courses/types/course";
import {
  TeacherDetailResponse,
  TeachersResponse,
} from "@/features/users/types/teacher-res";
import { apiService } from "@/services/api";

export const teacherService = {
  getAll: async () => {
    return await apiService.get<TeachersResponse>("/teachers");
  },

  getById: async (teacherId: string) => {
    return await apiService.get<TeacherDetailResponse>(
      `/teachers/${teacherId}`
    );
  },

  getAllCourses: async (teacherId: string) => {
    return await apiService.get<CourseResType>(
      `/teachers/${teacherId}/courses`
    );
  },
};
