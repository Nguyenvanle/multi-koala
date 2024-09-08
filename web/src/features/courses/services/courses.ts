import {
  CourseDetailResType,
  CourseResType,
} from "@/features/courses/types/course";
import { apiService } from "@/services/api";

export const courseService = {
  getAll: async () => {
    return await apiService.get<CourseResType>("/courses");
  },

  getDetail: async (courseId: string) => {
    return await apiService.get<CourseDetailResType>(`/courses/${courseId}`);
  },
};
