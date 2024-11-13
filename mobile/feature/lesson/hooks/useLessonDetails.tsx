import { useEffect, useState } from "react";
import { LessonDetailsBody } from "../types/lesson-details";
import { lessonDetailsServices } from "../services/lesson-details";

export const useLessonDetails = (lessonId: string) => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetailsBody>();
  const [errorMessageDetails, setErrorMessageDetails] = useState<string>("");
  const [loadingLessonDetails, setLoadingLessonDetails] =
    useState<boolean>(true);

  useEffect(() => {
    const getLessonDetails = async () => {
      try {
        setLoadingLessonDetails(true);
        const data = await lessonDetailsServices.getLessonDetails(lessonId);
        if (data.data.result) {
          setLessonDetails(data.data.result);
        } else {
          setErrorMessageDetails("Get lesson details failed.");
        }
      } finally {
        setLoadingLessonDetails(false);
      }
    };

    getLessonDetails(); // Gọi hàm getRating
  }, [lessonId]); // Thêm courseId vào dependency array

  return { lessonDetails, errorMessageDetails, loadingLessonDetails }; // Trả về giá trị
};
