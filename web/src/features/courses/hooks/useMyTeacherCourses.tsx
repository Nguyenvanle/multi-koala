import { logoutAction } from "@/features/auth/actions/logout";
import { refreshTokenAction } from "@/features/auth/actions/refresh-token";
import {
  TeacherMyCoursesBodyType,
  TeacherMyCoursesResType,
} from "@/features/courses/types/teacher-my-courses";
import { nextjsApiService } from "@/services/next-api";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export type SortOption = {
  field: keyof TeacherMyCoursesBodyType[0];
  direction: "asc" | "desc";
};

export type FilterOption = {
  field: keyof TeacherMyCoursesBodyType[0];
  value: string;
};

export default function useMyTeacherCourses() {
  const { data, error, mutate } = useSWR(`teacher-my-statistics-courses`, () =>
    nextjsApiService.get<TeacherMyCoursesResType>(
      `/api/courses/my-statistic-courses`
    )
  );
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption | null>({
    direction: "desc",
    field: "courseUploadedAt",
  });
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

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

  const filteredAndSortedCourses = useMemo(() => {
    let result = data?.result?.result || [];

    // Áp dụng tìm kiếm
    if (searchTerm) {
      result = result.filter((course) =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Áp dụng bộ lọc
    filterOptions.forEach((filter) => {
      result = result.filter((course) =>
        String(course[filter.field])
          .toLowerCase()
          .includes(filter.value.toLowerCase())
      );
    });

    // Áp dụng sắp xếp
    if (sortOption) {
      result.sort((a, b) => {
        if (a[sortOption.field] < b[sortOption.field])
          return sortOption.direction === "asc" ? -1 : 1;
        if (a[sortOption.field] > b[sortOption.field])
          return sortOption.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data?.result?.result, searchTerm, filterOptions, sortOption]);

  return {
    courses: filteredAndSortedCourses,
    loading: !error && !data,
    error: error?.message,
    sortOption,
    mutate: mutate,
    setSearchTerm,
    setSortOption,
    setFilterOptions,
  };
}
