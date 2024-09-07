import { useEffect, useState } from "react";
import { courseService } from "@/features/courses/services/courses";
import { CoursesResultResType } from "@/features/courses/types/course";

export default function useCourses() {
  const [courses, setCourses] = useState<CoursesResultResType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { result } = await courseService.getAll();
        setCourses(result?.result as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
