import { useEffect, useState } from "react";
import { TestList } from "../types/test";
import { testDetailsServices } from "../services/test";

export const useTestDetails = (lessonId: string) => {
  const [testDetails, setTestDetails] = useState<TestList>();
  const [errorMessageTest, setErrorMessage] = useState<string>("");
  const [loadingTest, setLoadingTest] = useState<boolean>(true);
  console.log(testDetails);
  useEffect(() => {
    const getTest = async () => {
      try {
        setLoadingTest(true);
        const data = await testDetailsServices.getTestDetails(lessonId);
        if (data.data.result) {
          setTestDetails(data.data.result);
        } else {
          setErrorMessage("Get test failed.");
        }
      } finally {
        setLoadingTest(false);
      }
    };

    getTest();
  }, [lessonId]);

  return { testDetails, errorMessageTest, loadingTest };
};
