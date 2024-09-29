import API_CONFIG from "@/src/types/api/config";
import { LessonResList } from "../types/lesson";

export const lessonServices = {
  getLesson: async (courseId: string) => {
    return await API_CONFIG.get<LessonResList>(`courses/${courseId}/lessons`);
  },
};
