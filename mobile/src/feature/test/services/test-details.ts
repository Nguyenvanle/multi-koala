import API_CONFIG from "@/src/types/api/config";
import { TestDetailsRes } from "../types/test";

export const testDetailsServices = {
  getTestDetails: async (lessonId: string, testId: string) => {
    return await API_CONFIG.get<TestDetailsRes>(
      `lessons/${lessonId}/tests/${testId}`
    );
  },
};
