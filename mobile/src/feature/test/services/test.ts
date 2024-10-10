import API_CONFIG from "@/src/types/api/config";
import { TestRes } from "../types/test";

export const testListServices = {
  getTestList: async (lessonId: string) => {
    return await API_CONFIG.get<TestRes>(`/lessons/${lessonId}/tests`);
  },
};
