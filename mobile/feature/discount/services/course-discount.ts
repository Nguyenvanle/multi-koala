import API_CONFIG from "@/types/config";
import { CourseDiscountRes } from "../types/course-discount";

export const courseDiscountServices = {
  getCourseDiscount: async (courseId: string) => {
    return await API_CONFIG.get<CourseDiscountRes>(
      `/courses/${courseId}/discount-applied`
    );
  },
};
