import { CourseResType } from "@/features/courses/types/course";
import { apiService } from "@/services/api";

export const courseService = {
  getAll: async () => {
    return await apiService.get<CourseResType>("/courses");
  },
};
