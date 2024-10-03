import useSWR from "swr";
import { useState } from "react";
import { CoursesResultResType } from "@/features/courses/types/course";
import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { CourseFacade } from "@/features/courses/services/course-facade";
import { CourseRepository } from "@/features/courses/services/course-repository";
import { useFilter } from "@/features/filter/hooks/useFilter";

const courseFacade = new CourseFacade(new CourseRepository());

const fetcher = async (url: string, sortOrder: SortOption, filters: any) => {
  return courseFacade.getProcessedCourses(sortOrder, filters);
};

export function useCourses() {
  const [sortOrder, setSortOrder] = useState<SortOption>("rating_desc");
  const {filters} = useFilter();

  const {
    data: courses,
    error,
    isValidating,
    mutate,
  } = useSWR(["/api/courses", sortOrder, filters], () =>
    fetcher("/api/courses", sortOrder, filters)
  );

  return {
    courses,
    isLoading: isValidating,
    isError: error,
    sortOrder,
    setSortOrder,
    filters,
    mutate,
  };
}