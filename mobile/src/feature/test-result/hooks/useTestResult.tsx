import { useState, useEffect } from "react";
import {
  SubmitBodyList,
  SubmitRes,
  TestResultBody,
} from "../types/test-result";
import { router, useGlobalSearchParams } from "expo-router";
import { useTestDetails } from "../../test/hooks/useTestDetails";
import { testResultService } from "./../services/test-result";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTestResult = (testId) => {
  const { lessonId } = useGlobalSearchParams();
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

  const onSubmit = async () => {
    try {
      setLoadingResult(true);
      setErrorResult(null);
      // Dữ liệu gửi đi đã được cập nhật từ handleSubmit
      const requestData: SubmitRes = {
        answerSubmitList: selectedAnswerList,
      };
      console.log(requestData);

      const request = await testResultService.getResult(
        testIdString, // Sử dụng testIdString ở đây
        requestData
      );
      if (request && request.data) {
        if (request.data.code === 200 && request.data.result) {
          setTestResult(request.data.result);
          console.log(request.data.result);
          // router.push(`/${testIdString}/${request.data.result.quizResultId}`);
        } else {
          setErrorResult(request.data.message || "An error occurred");
        }
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
    setTestResult,
    onSubmit, // Hàm này giờ đã sử dụng testIdString
  };
};

export default useTestResult;
