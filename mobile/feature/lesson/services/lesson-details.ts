import API_CONFIG from "@/types/config";
import { LessonDetailsRes } from "../types/lesson-details";

export const lessonDetailsServices = {
  getLessonDetails: async (lessonId: string) => {
    return await API_CONFIG.get<LessonDetailsRes>(`lessons/${lessonId}`);
  },
};
