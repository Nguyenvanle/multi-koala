import { useEffect, useState } from "react";
import { CourseDiscountBody } from "../types/course-discount";
import { courseDiscountServices } from "../services/course-discount";

export const useCourseDiscount = (courseId: string) => {
  const [discount, setDiscount] = useState<CourseDiscountBody>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDiscount = async () => {
      try {
        setLoading(true);
        const discountApplied = await courseDiscountServices.getCourseDiscount(
          courseId
        );
        if (discountApplied.data.result) {
          setDiscount(discountApplied.data.result);
        } else {
          setErrorMessage("Get course failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    getDiscount(); // Gọi hàm getRating
  }, []); // Thêm courseId vào dependency array

  return { discount, errorMessage, loading }; // Trả về giá trị
};
