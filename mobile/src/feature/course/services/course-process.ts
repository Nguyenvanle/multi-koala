import API_CONFIG from "@/src/types/api/config";
import { CourseProcessRes } from "../types/course-process";

export const courseProcessServices = {
  getprocess: async (courseId: string) => {
    return await API_CONFIG.get<CourseProcessRes>(
      `/enroll-courses/${courseId}`
    );
  },
};
