import { useState } from "react";
import {
  SubmitBodyList,
  SubmitRes,
  TestResultBody,
} from "../types/test-result";
import { useGlobalSearchParams } from "expo-router";
import { testStudentService } from "../services/test-student";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTestStudent = (testId) => {
  const { lessonId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const testIdString = Array.isArray(testId) ? testId[0] : testId;
  const [loadingStudentResult, setLoadingStudentResult] = useState(false);
  const [errorStudentResult, setErrorStudentResult] = useState<string | null>(
    null
  );
  const [errorStudentResultMessage, setErrorStudentResultMessage] = useState<
    string | null
  >(null);
  const [selectedAnswerList, setSelectedAnswerList] = useState<SubmitBodyList>(
    []
  );
  const [testStudentResult, setTestStudentResult] =
    useState<TestResultBody | null>();

  const onStudentSubmit = async () => {
    try {
      setLoadingStudentResult(true);
      setErrorStudentResult(null);

      // Dữ liệu gửi đi đã được cập nhật từ handleSubmit
      const requestData: SubmitRes = {
        answerSubmitList: selectedAnswerList,
      };
      console.log(requestData);

      const request = await testStudentService.getResult(
        testIdString, // Thay đổi ở đây
        requestData
      );
      if (request && request.data) {
        if (request.data.code === 200 && request.data.result) {
          setTestStudentResult(request.data.result);
          console.log(request.data.result);
        } else {
          setErrorStudentResult(request.data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error occurred: ", error); // Log lỗi chi tiết
      setErrorStudentResult(error.message || "No result.");
    } finally {
      setLoadingStudentResult(false);
    }
  };

  return {
    loadingStudentResult,
    errorStudentResult,
    errorStudentResultMessage,
    selectedAnswerList,
    setSelectedAnswerList,
    testStudentResult,
    setTestStudentResult,
    onStudentSubmit, // Hàm này giờ đã sử dụng testIdString
  };
};

export default useTestStudent;
