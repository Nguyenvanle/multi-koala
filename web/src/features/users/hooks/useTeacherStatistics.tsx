import {
  TeacherStatisticsBodyType,
  TeacherStatisticsResType,
} from "@/features/users/types/teacher-statistic";
import { nextjsApiService } from "@/services/next-api";
import useSWR from "swr";

export function useTeacherStatistics() {
  const { data, error, mutate } = useSWR(`teacher-statistics`, () =>
    nextjsApiService.get<TeacherStatisticsResType>(`/api/teachers/my-statistic`)
  );

  return {
    statistics: data?.result?.result as TeacherStatisticsBodyType,
    loading: !error && !data,
    error: error?.message,
    mutate: mutate,
  };
}
