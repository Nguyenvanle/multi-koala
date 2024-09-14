import { CourseTypeResType } from "@/features/course-type/types/course-type";
import { apiService } from "@/services/api";

export const courseTypeService = {
  getAll: async () => {
    return await apiService.get<CourseTypeResType>("/types");
  },
};
