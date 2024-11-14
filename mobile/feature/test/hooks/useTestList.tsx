import { useEffect, useState } from "react";
import { TestList } from "../types/test";
import { testListServices } from "../services/test";

export const useTestList = (lessonId: string) => {
  const [testList, setTestList] = useState<TestList | null>(null);
  const [errorMessageTest, setErrorMessage] = useState<string>("");
  const [loadingTest, setLoadingTest] = useState<boolean>(true);

  useEffect(() => {
    const getTest = async () => {
      if (!lessonId) return; // Kiểm tra nếu lessonId và testId có giá trị

      try {
        setLoadingTest(true);
        const data = await testListServices.getTestList(lessonId);
        if (data.data.result) {
          setTestList(data.data.result);
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
  }, [lessonId]);

  return { testList, errorMessageTest, loadingTest };
};
