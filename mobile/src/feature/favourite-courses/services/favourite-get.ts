import API_CONFIG from "@/src/types/api/config";
import { CourseResList } from "../types/favourite-course";

export const CourseGetService = {
  getFavourite: async ({ token }: { token: string }) => {
    return await API_CONFIG.get<CourseResList>(`/favourites/my-favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
