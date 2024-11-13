import API_CONFIG from "@/types/config";
import { LessonResList } from "../types/lesson";

export const lessonServices = {
  getLesson: async (courseId: string) => {
    return await API_CONFIG.get<LessonResList>(`courses/${courseId}/lessons`);
  },
};
