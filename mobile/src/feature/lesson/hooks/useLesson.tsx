import { useEffect, useState } from "react";
import { LessonBodyList } from "../types/lesson";
import { lessonServices } from "../services/lesson";

export const useLesson = (courseId: string) => {
  const [lesson, setLesson] = useState<LessonBodyList>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadinglesson, setLoadingLesson] = useState<boolean>(true);

  useEffect(() => {
    const getLesson = async () => {
      try {
        setLoadingLesson(true);
        const data = await lessonServices.getLesson(courseId);
        if (data.data.result) {
          setLesson(data.data.result);
        } else {
          setErrorMessage("Get lesson failed.");
        }
      } finally {
        setLoadingLesson(false);
      }
    };

    getLesson(); // Gọi hàm getRating
  }, [courseId]); // Thêm courseId vào dependency array

  return { lesson, errorMessage, loadinglesson }; // Trả về giá trị
};
