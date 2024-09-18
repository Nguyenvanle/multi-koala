// src/hook/course/useCourseDetails.ts
import { useState, useEffect } from "react";
import API_MAIN from "./api/config";

export interface CourseDetails {
  course: {
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
  };
}

export const useCourseDetailsProgress = (courseId: string) => {
  const [courseDetailsProgress, setCourseDetailsProgress] =
    useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        // Thay thế URL này bằng URL thực của API của bạn

        const responseprogress = await API_MAIN.get<CourseDetails>(
          `/courses/${courseId}`
        );
        setCourseDetailsProgress(responseprogress.data);
      } catch (err: any) {
        setError(err); // Lấy thông báo lỗi từ Axios

        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { courseDetailsProgress, loading, error };
};
