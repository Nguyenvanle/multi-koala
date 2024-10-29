import { useEffect, useState } from "react";
import { CourseBodyList } from "../types/course";
import { courseServices } from "../services/course";

export const useFilterCourse = () => {
  const [filterCourse, setFilterCourse] = useState<CourseBodyList>();
  const [errorFilterMessage, setErrorFilterMessage] = useState<string>("");
  const [loadingFilter, setLoadingFilter] = useState<boolean>(true);

  useEffect(() => {
    const getFilterCourse = async () => {
      try {
        setLoadingFilter(true);
        const course = await courseServices.getcourse(); // Sửa dòng này
        if (course.data.result) {
          setFilterCourse(course.data.result);
        } else {
          setErrorFilterMessage("Get filter course failed.");
        }
      } finally {
        setLoadingFilter(false);
      }
    };

    getFilterCourse(); // Gọi hàm getRating
  }, []); // Thêm courseId vào dependency array

  return { filterCourse, errorFilterMessage, loadingFilter }; // Trả về giá trị
};
