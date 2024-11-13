import API_CONFIG from "@/types/config";
import { SubmitRes, TestResultRes } from "../types/test-result";

export const testResultService = {
  getResult: async (testId: string, submit: SubmitRes) => {
    return await API_CONFIG.post<TestResultRes>(
      `/tests/${testId}/submit-quiz`,
      submit
    );
  },
};
