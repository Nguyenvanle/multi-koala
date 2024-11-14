import { useEffect, useState } from "react";
import { TestDetails } from "../types/test";
import { testDetailsServices } from "../services/test-details";

export const useTestDetails = (lessonId: string, testId: string | null) => {
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const [errorMessageTest, setErrorMessage] = useState<string>("");
  const [loadingTest, setLoadingTest] = useState<boolean>(true);

  useEffect(() => {
    const getTest = async () => {
      if (!lessonId || !testId) return; // Kiểm tra nếu lessonId và testId có giá trị

      try {
        setLoadingTest(true);
        const data = await testDetailsServices.getTestDetails(lessonId, testId);
        if (data.data.result) {
          setTestDetails(data.data.result);
        } else {
          setErrorMessage("Get test failed.");
        }
        const getData = data.data.result;
      } catch (error) {
        setErrorMessage("Failed to fetch test details.");
      } finally {
        setLoadingTest(false);
      }
    };

    getTest();
  }, [lessonId, testId]);

  return { testDetails, errorMessageTest, loadingTest };
};
