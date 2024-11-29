import { useEffect, useState } from "react";
import { lessonServices } from "../services/lesson";
import { ResultBodyList } from "../types/lesson";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LessonBodyList, LessonResList } from "../types/lesson-guest";
import { lessonGuestServices } from "../services/lesson-guest";

export const useLessonGuest = (courseId: string) => {
  const [lessonGuest, setLessonGuest] = useState<LessonBodyList>();
  const [errorMessageGuest, setErrorMessageGuest] = useState<string>("");
  const [loadingLessonGuest, setLoadingLessonGuest] = useState<boolean>(true);

  useEffect(() => {
    const getLesson = async () => {
      try {
        setLoadingLessonGuest(true);

        const data = await lessonGuestServices.getLesson(courseId);
        if (data && data.data && data.data.result) {
          setLessonGuest(data.data.result);
        } else {
          setErrorMessageGuest("Get lesson failed.");
        }
      } finally {
        setLoadingLessonGuest(false);
      }
    };

    getLesson(); // Gọi hàm getRating
  }, [courseId]); // Thêm courseId vào dependency array

  return { lessonGuest, errorMessageGuest, loadingLessonGuest }; // Trả về giá trị
};
