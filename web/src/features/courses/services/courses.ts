import {
  CourseDetailResType,
  CourseResType,
} from "@/features/courses/types/course";
import { DiscountResType } from "@/features/discount/types/discount";
import { apiService } from "@/services/api";

export const courseService = {
  getAll: async () => {
    return await apiService.get<CourseResType>("/courses");
  },

  getDetail: async (courseId: string) => {
    return await apiService.get<CourseDetailResType>(`/courses/${courseId}`);
  },

  // need refactor
  getAllStudent: async (courseId: string) => {
    return await apiService.get<any>(`/courses/${courseId}/students`);
  },

  getDiscount: async (courseId: string) => {
    return await apiService.get<DiscountResType>(
      `/courses/${courseId}/discount-applied`
    );
  },
};
