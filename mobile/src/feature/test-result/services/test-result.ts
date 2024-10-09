import API_CONFIG from "@/src/types/api/config";
import { SubmitRes, TestResultRes } from "../types/test-result";

export const testResultService = {
  getResult: async (testId: string, submit: SubmitRes) => {
    return await API_CONFIG.post<TestResultRes>(
      `/tests/${testId}/submit-quiz`,
      submit
    );
  },
};
