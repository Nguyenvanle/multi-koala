import API_CONFIG from "@/src/types/api/config";
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
