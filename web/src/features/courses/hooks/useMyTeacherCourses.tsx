import {
  CourseResType,
  CoursesResultResType,
} from "@/features/courses/types/course";
import { nextjsApiService } from "@/services/next-api";
import useSWR from "swr";

export default function useMyTeacherCourses() {
  const { data, error } = useSWR(`teacher-my-statistics-courses`, () =>
    nextjsApiService.get<CourseResType>(`/api/courses/my-statistic-courses`)
  );

  return {
    courses: data?.result?.result as CoursesResultResType,
    loading: !error && !data,
    error: error?.message,
  };
}
