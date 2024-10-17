import API_CONFIG from "@/src/types/api/config";
import { CourseDelete } from "../types/favourite-course";

export const CourseDeleteService = {
  deleteCourse: async (favouriteId: string, token: string) => {
    return await API_CONFIG.delete<CourseDelete>(`/favourites/${favouriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
