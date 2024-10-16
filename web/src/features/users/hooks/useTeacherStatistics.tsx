import { logoutAction } from "@/features/auth/actions/logout";
import { refreshTokenAction } from "@/features/auth/actions/refresh-token";
import {
  TeacherStatisticsBodyType,
  TeacherStatisticsResType,
} from "@/features/users/types/teacher-statistic";
import { nextjsApiService } from "@/services/next-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export function useTeacherStatistics() {
  const { data, error, mutate } = useSWR(`teacher-statistics`, () =>
    nextjsApiService.get<TeacherStatisticsResType>(`/api/teachers/my-statistic`)
  );

  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      if (data?.code === 401) {
        try {
          console.log("Teacher statistic 401");
          const refreshData = await refreshTokenAction();

          if (!refreshData) {
            console.log("Fail to refresh, logout action.");
            logoutAction();
          }

          mutate();
          router.refresh();
        } catch (error) {
          console.error("Error to refresh, logout action: ", error);
          logoutAction();
        }
      }
    };

    fetch();
  }, [data?.code, mutate, router]);

  return {
    statistics: data?.result?.result as TeacherStatisticsBodyType,
    loading: !error && !data,
    error: error?.message,
    mutate: mutate,
  };
}
