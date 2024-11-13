import { useEffect, useState } from "react";
import { CourseRatingBody } from "../types/course-rating";
import { courseRatingServices } from "../services/course-rating";

export const useCourseRating = (courseId: string) => {
  const [courseRating, setCourseRating] = useState<CourseRatingBody>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRating = async () => {
      try {
        setLoading(true);
        const rating = await courseRatingServices.getrating(courseId); // Sửa dòng này
        // Gán cả đối tượng CourseRatingBody chứ không chỉ là avgcourseRating
        const courseRatingData: CourseRatingBody = {
          avgcourseRating: rating.data.result.avgcourseRating,
          // Bạn có thể thêm các thuộc tính khác nếu có
        };
        setCourseRating(courseRatingData);
        setErrorMessage("Get rating failed.");
      } finally {
        setLoading(false);
      }
    };

    getRating(); // Gọi hàm getRating
  }, [courseId]); // Thêm courseId vào dependency array

  return { courseRating, errorMessage, loading }; // Trả về giá trị
};
