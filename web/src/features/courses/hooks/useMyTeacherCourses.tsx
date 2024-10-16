import { logoutAction } from "@/features/auth/actions/logout";
import { refreshTokenAction } from "@/features/auth/actions/refresh-token";
import {
  TeacherMyCoursesBodyType,
  TeacherMyCoursesResType,
} from "@/features/courses/types/teacher-my-courses";
import { nextjsApiService } from "@/services/next-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export default function useMyTeacherCourses() {
  const { data, error, mutate } = useSWR(`teacher-my-statistics-courses`, () =>
    nextjsApiService.get<TeacherMyCoursesResType>(
      `/api/courses/my-statistic-courses`
    )
  );
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      if (data?.code === 401) {
        try {
          console.log("Teacher Statistic 401");
          const refreshData = await refreshTokenAction();

          if (!refreshData) {
            console.log("Fail to refresh, logout action.");
            logoutAction();
          }

          mutate();
          router.refresh();
        } catch (error) {
          console.error("Error to refresh, logout action: ", error);
        }
      }
    };

    fetch();
  }, [data?.code, mutate, router]);

  return {
    courses: data?.result?.result as TeacherMyCoursesBodyType,
    loading: !error && !data,
    error: error?.message,
    mutate: mutate,
  };
}
