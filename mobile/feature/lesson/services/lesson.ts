import API_CONFIG from "@/types/config";
import { ResultRes } from "../types/lesson";

export const lessonServices = {
  getLesson: async (courseId: string, token: string) => {
    return await API_CONFIG.get<ResultRes>(`/courses/${courseId}/my-lessons`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
