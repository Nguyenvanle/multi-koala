import API_CONFIG from "@/types/config";
import { SubmitRes, TestResultRes } from "../types/test-result";

export const testStudentService = {
  getResult: async (testId: string, submit: SubmitRes, token: string) => {
    return await API_CONFIG.post<TestResultRes>(
      `/tests/${testId}/submit-quiz`,
      submit,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
