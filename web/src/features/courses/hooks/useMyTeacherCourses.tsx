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

interface PaginationOptions {
  pageSize?: number;
  initialPage?: number;
}

export default function useMyTeacherCourses(options: PaginationOptions = {}) {
  const { pageSize = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

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

  const courses = useMemo(
    () => (data?.result?.result as TeacherMyCoursesBodyType) || [],
    [data?.result?.result]
  );

  // Tính toán tổng số trang
  const totalPages = Math.ceil(courses.length / pageSize);

  // Lấy danh sách Courses cho trang hiện tại
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return courses.slice(startIndex, endIndex);
  }, [courses, currentPage, pageSize]);

  // Các hàm điều hướng trang
  const goToPage = (page: number) => {
    const validatedPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validatedPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

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

  const processedCourses = useMemo(() => {
    // Áp dụng phân trang
    let result = paginatedCourses || [];

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
  }, [paginatedCourses, searchTerm, filterOptions, sortOption]);

  return {
    courses: processedCourses,
    // Metadata phân trang
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      totalItems: courses.length,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
    // Các hàm điều hướng
    paginationControls: {
      goToPage,
      nextPage,
      previousPage,
      resetPage,
    },
    loading: !error && !data,
    error: error?.message,
    sortOption,
    mutate: mutate,
    setSearchTerm,
    setSortOption,
    setFilterOptions,
  };
}
