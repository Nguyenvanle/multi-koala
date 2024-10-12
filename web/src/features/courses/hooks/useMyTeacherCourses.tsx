import {
  TeacherMyCoursesBodyType,
  TeacherMyCoursesResType,
} from "@/features/courses/types/teacher-my-courses";
import { nextjsApiService } from "@/services/next-api";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function useMyTeacherCourses() {
  const { data, error, mutate } = useSWR(`teacher-my-statistics-courses`, () =>
    nextjsApiService.get<TeacherMyCoursesResType>(
      `/api/courses/my-statistic-courses`
    )
  );
  const router = useRouter();

  if (data?.code === 401) router.refresh();

  return {
    courses: data?.result?.result as TeacherMyCoursesBodyType,
    loading: !error && !data,
    error: error?.message,
    mutate: mutate,
  };
}
