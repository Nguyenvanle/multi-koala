import API_CONFIG from "@/types/config";
import { CourseRes } from "../types/favourite-course";

export const CoursePostService = {
  postCourse: async (courseId: string, token: string) => {
    return await API_CONFIG.post<CourseRes>(`/courses/${courseId}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
