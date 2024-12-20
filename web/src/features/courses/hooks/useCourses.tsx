import useSWR from "swr";
import { useState } from "react";
import { CoursesResultResType } from "@/features/courses/types/course";
import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { CourseFacade } from "@/features/courses/services/course-facade";
import { CourseRepository } from "@/features/courses/services/course-repository";
import { useFilter } from "@/features/filter/hooks/useFilter";

const courseRepository = new CourseRepository();
const courseFacade = new CourseFacade(courseRepository);

const fetcher = async (url: string, sortOrder: SortOption, filters: any) => {
  return courseFacade.getProcessedCourses(sortOrder, filters);
};

export function useCourses() {
  const [sortOrder, setSortOrder] = useState<SortOption>("rating_desc");
  const { filters } = useFilter();

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

export function useCoursesWithoutFilter() {
  const {
    data: courses,
    error,
    isLoading,
    mutate,
  } = useSWR(`get-courses-without-filter`, () =>
    courseRepository.getCourses(true)
  );

  return {
    courses,
    isLoading,
    isError: error,
    mutate,
  };
}