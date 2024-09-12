import {
  CourseDetailResType,
  CourseResType,
} from "@/features/courses/types/course";
import { DiscountResType } from "@/features/courses/types/discount";
import { apiService } from "@/services/api";

export const courseService = {
  getAll: async () => {
    return await apiService.get<CourseResType>("/courses");
  },

  getDetail: async (courseId: string) => {
    return await apiService.get<CourseDetailResType>(`/courses/${courseId}`);
  },

  // getAllStudent: async (courseId: string) => {
  //   return await apiService.get<any>(`/courses/${courseId}/students`);
  // },

  getAllDiscount: async (courseId: string) => {
    return await apiService.get<DiscountResType>(
      `/courses/${courseId}/discount-only`
    );
  },
};
