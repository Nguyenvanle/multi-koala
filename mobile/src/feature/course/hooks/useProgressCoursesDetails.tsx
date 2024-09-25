import { useEffect, useState } from "react";
import { CourseDetails } from "../types/progress-courses-details";
import API_CONFIG from "@/src/types/api/config";

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

        const responseprogress = await API_CONFIG.get<CourseDetails>(
          `/courses/${courseId}`
        );
        setCourseDetailsProgress(responseprogress.data);
      } catch (err: any) {
        setError(err); // Lấy thông báo lỗi từ Axios

        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { courseDetailsProgress, loading, error };
};
