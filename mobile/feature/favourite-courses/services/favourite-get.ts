import API_CONFIG from "@/types/config";
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
