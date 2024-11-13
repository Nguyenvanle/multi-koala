import API_CONFIG from "@/types/config";
import { CourseRatingRes } from "../types/course-rating";

export const courseRatingServices = {
  getrating: async (courseId: string) => {
    return await API_CONFIG.get<CourseRatingRes>(
      `/courses/${courseId}/reviews/avg-rating`
    );
  },
};
