import API_CONFIG from "@/src/types/api/config";
import { CourseRes } from "../types/favourite-course";

export const CourseFavouriteService = {
  postcourse: async (courseId: string, token: string) => {
    return await API_CONFIG.post<CourseRes>(`/courses/${courseId}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deletecourse: async (courseId: string, token: string) => {
    return await API_CONFIG.delete(`/courses/${courseId}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getFavourite: async (courseId: string, token: string) => {
    return await API_CONFIG.get<CourseRes>(`/courses/${courseId}/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
