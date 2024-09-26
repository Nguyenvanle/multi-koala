import { useEffect, useState } from "react";
import { CourseBodyList } from "../types/course";
import { courseServices } from "../services/course";

export const useCourse = () => {
  const [course, setCourse] = useState<CourseBodyList>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const course = await courseServices.getcourse(); // Sửa dòng này
        if (course.data.result) {
          setCourse(course.data.result);
        } else {
          setErrorMessage("Get course failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    getCourse(); // Gọi hàm getRating
  }, []); // Thêm courseId vào dependency array

  return { course, errorMessage, loading }; // Trả về giá trị
};
