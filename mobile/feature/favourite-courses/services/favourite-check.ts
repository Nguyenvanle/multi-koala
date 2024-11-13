import API_CONFIG from "@/types/config";
import { CourseCheck } from "../types/favourite-course";

export const CourseCheckService = {
  checkCourse: async (courseId: string, token: string) => {
    return await API_CONFIG.post<CourseCheck>(
      `/courses/${courseId}/favourite-check`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
