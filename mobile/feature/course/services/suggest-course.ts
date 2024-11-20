import API_CONFIG from "@/types/config";
import { SuggestRes } from "../types/suggest-course";
import { EnrolledBody } from "../types/course-enrolled";

export const suggestCourseServices = {
  getSuggest: async (token: string, enrollCourseId: string) => {
    return await API_CONFIG.get<SuggestRes>(
      `/enroll-courses/${enrollCourseId}/suggest-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
