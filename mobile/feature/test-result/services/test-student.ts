import API_CONFIG from "@/types/config";
import { SubmitRes, TestResultRes } from "../types/test-result";

export const testStudentService = {
  getResult: async (testId: string, token: string, submit: SubmitRes) => {
    return await API_CONFIG.post<TestResultRes>(
      `/tests/${testId}/submit-quiz`,
      submit, // body data
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
