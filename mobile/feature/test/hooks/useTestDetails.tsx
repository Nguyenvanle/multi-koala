import { useEffect, useState } from "react";
import { TestDetails } from "../types/test";
import { testDetailsServices } from "../services/test-details";

export const useTestDetails = (lessonId: string, testId: string | null) => {
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const [errorMessageTestDetails, setErrorMessageTestDetails] =
    useState<string>("");
  const [loadingTestDetails, setLoadingTestDetails] = useState<boolean>(true);

  useEffect(() => {
    const getTest = async () => {
      if (!lessonId || !testId) return; // Kiểm tra nếu lessonId và testId có giá trị

      try {
        setLoadingTestDetails(true);
        const data = await testDetailsServices.getTestDetails(lessonId, testId);
        if (data.data.result) {
          setTestDetails(data.data.result);
        } else {
          setErrorMessageTestDetails("Get test failed.");
        }
        const getData = data.data.result;
      } catch (error) {
        setErrorMessageTestDetails("Failed to fetch test details.");
      } finally {
        setLoadingTestDetails(false);
      }
    };

    getTest();
  }, [lessonId, testId]);

  return { testDetails, errorMessageTestDetails, loadingTestDetails };
};
