import { courseTypeService } from "@/features/course-type/services/course-type";
import { CourseTypesResultResType } from "@/features/course-type/types/course-type";
import { useEffect, useState } from "react";

export default function useCourseType() {
  const [courseTypes, setCourseTypes] =
    useState<CourseTypesResultResType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const { result } = await courseTypeService.getAll();

        if (result) {
          setCourseTypes(result.result);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseTypes();
  }, []);

  return { courseTypes, loading, error };
}
