import API_CONFIG from "@/src/types/api/config";
import { CourseDiscountRes } from "../types/course-discount";

export const courseDiscountServices = {
  getCourseDiscount: async (courseId: string) => {
    return await API_CONFIG.get<CourseDiscountRes>(
      `/courses/${courseId}/discount-applied`
    );
  },
};
