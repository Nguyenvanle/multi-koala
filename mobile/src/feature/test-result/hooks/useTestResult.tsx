import { useState, useEffect } from "react";
import {
  SubmitBody,
  SubmitBodyList,
  SubmitRes,
  TestResultBody,
  TestResultRes,
} from "../types/test-result";
import { useGlobalSearchParams } from "expo-router";
import { useTestDetails } from "../../test/hooks/useTestDetails";
import { testResultService } from "./../services/test-result";

const useTestResult = (testId: string) => {
  const lessonId = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const testIdString = Array.isArray(testId) ? testId[0] : testId;
  const { testDetails, errorMessageTest, loadingTest } = useTestDetails(
    lessonIdString,
    testIdString
  );
  const [loadingResult, setLoadingResult] = useState(false);
  const [errorResult, setErrorResult] = useState<string | null>(null);
  const [errorResultMessage, setErrorResultMessage] = useState<string | null>(
    null
  );
  const [selectedAnswerList, setSelectedAnswerList] = useState<SubmitBodyList>(
    []
  );
  const [testResult, setTestResult] = useState<TestResultBody | null>();

  const initializeAnswerList = () => {
    if (testDetails && testDetails.length > 0) {
      const initialList: SubmitBodyList = testDetails[0].questions.map(
        (question) => ({
          questionId: question.questionId,
          selectedAnswerId: null, // Initially set to null
        })
      );
      setSelectedAnswerList(initialList);
    }
  };

  useEffect(() => {
    initializeAnswerList();
  }, [testDetails]);

  const onSubmit = async (testIdString) => {
    if (!selectedAnswerList || selectedAnswerList.length === 0) {
      setErrorResultMessage("No result available.");
      return;
    }

    try {
      setLoadingResult(true);
      setErrorResult(null);
      const requestData: SubmitRes = {
        answerSubmitList: selectedAnswerList,
      };
      console.log("Request Data: ", requestData); // Log dữ liệu trước khi gửi

      const request = await testResultService.getResult(
        testIdString,
        requestData
      );

      console.log("Response from server: ", request); // Log phản hồi từ server

      if (request && request.data) {
        if (request.data.code === 200 && request.data.result) {
          setTestResult(request.data.result);
        } else {
          setErrorResult(request.data.message || "An error occurred");
        }
      } else {
        setErrorResult("Unexpected response format");
      }
    } catch (error) {
      console.error("Error occurred: ", error); // Log lỗi chi tiết
      setErrorResult(error.message || "No result.");
    } finally {
      setLoadingResult(false);
    }
  };

  return {
    loadingResult,
    errorResult,
    errorResultMessage,
    selectedAnswerList,
    setSelectedAnswerList,
    testResult,
    onSubmit,
    initializeAnswerList,
  };
};

export default useTestResult;
