import { useState } from "react";
import { QuizResultList } from "../types/test-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { testResultListServices } from "../services/test-list";

const useTestResultList = (testId) => {
  const testIdString = testId as string;
  const [loadingResultList, setLoadingResultList] = useState(false);
  const [errorResultList, setErrorResultList] = useState<string | null>(null);
  const [errorResultListMessage, setErrorResultListMessage] = useState<
    string | null
  >(null);
  const [testResultList, setTestResultList] = useState<QuizResultList | null>(
    []
  );

  const handleTest = async () => {
    try {
      setLoadingResultList(true);
      setErrorResultList(null);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setErrorResultListMessage("No token found. Please log in.");
        return;
      }

      const getTest = await testResultListServices.getResult(
        testIdString,
        token
      );
      if (getTest && getTest.data) {
        if (getTest.data.code === 200 && getTest.data.result) {
          setTestResultList(getTest.data.result);
        } else {
          setErrorResultList(getTest.data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error occurred: ", error);
      setErrorResultList(error.message || "No result.");
    } finally {
      setLoadingResultList(false);
    }
  };

  return {
    loadingResultList,
    errorResultList,
    errorResultListMessage,
    testResultList,
    setTestResultList,
    handleTest,
  };
};

export default useTestResultList;
