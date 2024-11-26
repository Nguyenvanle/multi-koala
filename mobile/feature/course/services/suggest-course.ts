import API_CONFIG from "@/types/config";
import { SuggestRes } from "../types/suggest-course";

export const suggestCourseServices = {
  getSuggest: async (token: string, courseId: string) => {
    return await API_CONFIG.get<SuggestRes>(
      `/courses/${courseId}/suggest-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
