import { useEffect, useState } from "react";
import { lessonServices } from "../services/lesson";
import { ResultBodyList } from "../types/lesson";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLesson = (courseId: string) => {
  const [lesson, setLesson] = useState<ResultBodyList>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingLesson, setLoadingLesson] = useState<boolean>(true);

  useEffect(() => {
    const getLesson = async () => {
      try {
        setLoadingLesson(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found. Please log in.");
          return;
        }
        const data = await lessonServices.getLesson(courseId, token);
        if (data && data.data && data.data.result) {
          setLesson(data.data.result);
          console.log(data.data.result);
        } else {
          setErrorMessage("Get lesson failed.");
        }
      } finally {
        setLoadingLesson(false);
      }
    };

    getLesson(); // Gọi hàm getRating
  }, [courseId]); // Thêm courseId vào dependency array

  return { lesson, errorMessage, loadingLesson }; // Trả về giá trị
};
