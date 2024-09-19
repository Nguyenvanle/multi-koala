// src/hook/course/useCourseDetails.ts
import { useState, useEffect } from "react";
import API_MAIN from "./config";
import { CourseRes } from "@/src/types/course/course-res";

export interface CourseNormal {
  courseId: string;
  courseName: string;
  coursePrice: number;
  image: {
    imageUrl: string;
    image: string;
  };
  courseDescription: string;
  uploadedByTeacher: {
    firstname: string;
    lastname: string;
  };
  courseLevel: string;
  courseRating: number;
  types: {
    typeName: string;
    typeDescription: string;
  };
  fields: {
    fieldName: string;
    fielDescription: string;
  };
  discountApprovedRate: number;
  status: string;
  process: number;
}

export const useCourseDetails = (courseId: string) => {
  const [courseDetails, setCourseDetails] = useState<CourseNormal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        // Thay thế URL này bằng URL thực của API của bạn
        const responseAll = await API_MAIN.get<CourseRes>(
          `/courses/${courseId}`
        );

        setCourseDetails(responseAll.data.result as CourseNormal);
      } catch (err) {
        setError(error); // Lấy thông báo lỗi từ Axios
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { courseDetails, loading, error };
};
