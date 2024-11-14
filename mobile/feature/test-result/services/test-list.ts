import API_CONFIG from "@/types/config";
import { ResultRes } from "../types/test-list";

export const testResultListServices = {
  getResult: async (testId: string, token: string) => {
    return await API_CONFIG.get<ResultRes>(`/tests/${testId}/my-quiz-result`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
