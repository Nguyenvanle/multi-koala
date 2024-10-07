import {
  TeacherMyCoursesBodyType,
  TeacherMyCoursesResType,
} from "@/features/courses/types/teacher-my-courses";
import { nextjsApiService } from "@/services/next-api";
import useSWR from "swr";

export default function useMyTeacherCourses() {
  const { data, error } = useSWR(`teacher-my-statistics-courses`, () =>
    nextjsApiService.get<TeacherMyCoursesResType>(
      `/api/courses/my-statistic-courses`
    )
  );

  return {
    courses: data?.result?.result as TeacherMyCoursesBodyType,
    loading: !error && !data,
    error: error?.message,
  };
}
