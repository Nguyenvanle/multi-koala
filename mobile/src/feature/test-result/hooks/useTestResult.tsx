import { useState, useEffect } from "react";
import {
  SubmitBodyList,
  SubmitRes,
  TestResultBody,
} from "../types/test-result";
import { useGlobalSearchParams } from "expo-router";
import { useTestDetails } from "../../test/hooks/useTestDetails";
import { testResultService } from "./../services/test-result";

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

  const initializeAnswerList = () => {
    // Khởi tạo danh sách các câu trả lời đã chọn cho các câu hỏi trong một bài test.
    if (testDetails && testDetails.questions.length > 0) {
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

  const onSubmit = async () => {
    // Xử lý việc gửi danh sách câu trả lời đã chọn cho một bài test tới server để nhận kết quả của bài test đó
    if (!selectedAnswerList || selectedAnswerList.length === 0) {
      setErrorResultMessage("Please choose at least 1 answer.");
      return;
    }

    try {
      setLoadingResult(true);
      setErrorResult(null);
      const requestData: SubmitRes = {
        answerSubmitList: selectedAnswerList || null,
      };

      const request = await testResultService.getResult(
        testIdString, // Sử dụng testIdString ở đây
        requestData
      );

      if (request && request.data) {
        if (request.data.code === 200 && request.data.result) {
          setTestResult(request.data.result);
          console.log(request.data.result.totalQuestion); // Kiểm tra dữ liệu kết quả
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
    initializeAnswerList,
  };
};

export default useTestResult;
