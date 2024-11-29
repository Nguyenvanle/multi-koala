import API_CONFIG from "@/types/config";
import { LessonResList } from "../types/lesson-guest";

export const lessonGuestServices = {
  getLesson: async (courseId: string) => {
    return await API_CONFIG.get<LessonResList>(`/courses/${courseId}/lessons`);
  },
};
