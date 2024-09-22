import { useEffect, useState, useMemo } from "react";
import { CoursesResultResType } from "@/features/courses/types/course";
import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { useFilter } from "@/features/filter/hooks/useFilter";
import { CourseFacade } from "@/features/courses/services/course-facade";
import { CourseRepository } from "@/features/courses/services/course-repository";

export default function useCourses() {
  const [courses, setCourses] = useState<CoursesResultResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOption>("rating_desc");
  const { filters } = useFilter();

  const courseFacade = useMemo(() => new CourseFacade(new CourseRepository()), []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const processedCourses = await courseFacade.getProcessedCourses(sortOrder, filters);
        setCourses(processedCourses);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseFacade, sortOrder, filters]);

  return { courses, loading, error, setSortOrder };
}
