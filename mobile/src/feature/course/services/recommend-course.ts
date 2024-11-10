import API_CONFIG from "@/src/types/api/config";
import { ResultRes } from "../types/recommend-course";

export const recommendCourseServices = {
  getRecommend: async ({ token }: { token: string }) => {
    return await API_CONFIG.get<ResultRes>(`/courses/my-recommend-courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
