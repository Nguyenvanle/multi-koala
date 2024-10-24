"use client";

import { getRecentEnroll } from "@/features/enroll-courses/actions/get-recent-enroll";
import { RecentEnrollBodyType } from "@/features/enroll-courses/types/recent-enroll";
import useSWR from "swr";

export default function useEnrollCourses() {
  const { data, error, isLoading, mutate } = useSWR(
    `recently-student-enrolled-my-courses`,
    () => getRecentEnroll()
  );

  return {
    students: data?.student as RecentEnrollBodyType[],
    loading: isLoading,
    error: error?.message,
    mutate: mutate,
  };
}
