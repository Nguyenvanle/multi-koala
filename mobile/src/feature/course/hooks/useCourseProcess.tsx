import { useEffect, useState } from "react";
import { CourseProcessBody } from "../types/course-process";
import { courseProcessServices } from "../services/course-process";

export const useCourseProcess = (courseId: string) => {
  const [courseProcess, setCourseProcess] = useState<CourseProcessBody>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRating = async () => {
      try {
        setLoading(true);
        const process = await courseProcessServices.getprocess(courseId); // Sửa dòng này
        // Gán cả đối tượng CourseRatingBody chứ không chỉ là avgcourseRating
        const courseProcessData: CourseProcessBody = {
          process: process.data.result.process,
          // Bạn có thể thêm các thuộc tính khác nếu có
        };
        setCourseProcess(courseProcessData);
        setErrorMessage("Get process failed.");
      } finally {
        setLoading(false);
      }
    };

    getRating(); // Gọi hàm getRating
  }, [courseId]); // Thêm courseId vào dependency array

  return { courseProcess, errorMessage, loading }; // Trả về giá trị
};
