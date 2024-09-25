import API_CONFIG from "@/src/types/api/config";
import { CourseRatingRes } from "../types/course-rating";

export const courseRatingServices = {
  getrating: async (courseId: string) => {
    return await API_CONFIG.get<CourseRatingRes>(
      `/courses/${courseId}/reviews/avg-rating`
    );
  },
};
