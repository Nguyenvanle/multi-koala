import { useEffect, useState } from "react";
import { courseService } from "@/features/courses/services/courses";
import { CourseResType } from "@/features/courses/types/course";

export default function useCourses() {
  const [courses, setCourses] = useState<CourseResType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { result } = await courseService.getAll();
        setCourses(result as any); // đảm bảo response.result có kiểu CourseResType[]
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    // Chỉ nên log ở đây sẽ giúp bạn tránh việc log không đúng trạng thái
    // console.log(courses); // không nên log ở đây vì courses sẽ không cập nhật ngay lập tức
    // console.log(error);
  }, []); // chỉ chạy 1 lần khi component mount

  return { courses, loading, error };
}
