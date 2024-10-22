import { getTopCourses } from "@/features/courses/actions/get-top-courses";
import { MyPerformingCoursesBodyType } from "@/features/courses/types/course-perform";
import useSWR from "swr";

export default function useMyPerformingCourses() {
  const { data, error, isLoading } = useSWR(`get-top-courses`, () =>
    getTopCourses()
  );

  // Sắp xếp các khóa học theo income giảm dần
  const sortedCourses = data?.courses.sort(
    (a: MyPerformingCoursesBodyType, b: MyPerformingCoursesBodyType) =>
      b.income - a.income
  );

  return {
    topCourses: sortedCourses,
    isLoading: isLoading || error,
    error: error,
  };
}
