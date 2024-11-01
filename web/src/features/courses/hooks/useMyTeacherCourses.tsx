import { logoutAction } from "@/features/auth/actions/logout";
import { refreshTokenAction } from "@/features/auth/actions/refresh-token";
import {
  TeacherMyCoursesBodyType,
  TeacherMyCoursesResType,
} from "@/features/courses/types/teacher-my-courses";
import { nextjsApiService } from "@/services/next-api";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams()

  // States
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption | null>({
    direction: "desc",
    field: "courseUploadedAt",
  });
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  // Fetch data
  const { data, error, mutate } = useSWR(`teacher-my-statistics-courses`, () =>
    nextjsApiService.get<TeacherMyCoursesResType>(
      `/api/courses/my-statistic-courses`
    )
  );

  // Extract original courses data
  const originalCourses = useMemo(
    () => (data?.result?.result as TeacherMyCoursesBodyType) || [],
    [data?.result?.result]
  );

  // Process data: search -> filter -> sort
  const processedCourses = useMemo(() => {
    let result = [...originalCourses];

    // 1. Áp dụng tìm kiếm trên toàn bộ dữ liệu
    if (searchTerm) {
      result = result.filter((course) =>
        course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Áp dụng bộ lọc
    filterOptions.forEach((filter) => {
      result = result.filter((course) =>
        String(course[filter.field])
          .toLowerCase()
          .includes(filter.value.toLowerCase())
      );
    });



    // 3. Áp dụng sắp xếp
    if (sortOption) {
      result.sort((a, b) => {
        const aValue = a[sortOption.field];
        const bValue = b[sortOption.field];
        return sortOption.direction === "asc"
          ? aValue < bValue ? -1 : 1
          : aValue < bValue ? 1 : -1;
      });
    }

    return result;
  }, [originalCourses, searchTerm, filterOptions, sortOption]);

  // 4. Cuối cùng mới áp dụng phân trang
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return processedCourses.slice(startIndex, endIndex);
  }, [processedCourses, currentPage, pageSize]);

  // Tính toán tổng số trang dựa trên dữ liệu đã được search, filter, sort
  const totalPages = Math.ceil(processedCourses.length / pageSize);

  // Reset về trang 1 khi thay đổi search, filter hoặc sort
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterOptions, sortOption]);

  // Xử lý refresh token
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

  useEffect(() => {
    const sort = searchParams.get('sort');
    
    if (sort === 'sales') {
      setSortOption({
        direction: "desc",
        field: "totalEnrollments",
      });
    }
  }, [searchParams]);

  // Pagination controls
  const paginationControls = {
    goToPage: (page: number) => {
      const validatedPage = Math.min(Math.max(1, page), totalPages);
      setCurrentPage(validatedPage);
    },
    nextPage: () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    previousPage: () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    },
    resetPage: () => setCurrentPage(1),
  };

  return {
    // Dữ liệu đã được phân trang
    courses: paginatedCourses,
    // Tổng số dữ liệu sau khi search/filter (trước khi phân trang)
    totalFilteredCourses: processedCourses.length,
    // Metadata phân trang
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      totalItems: processedCourses.length,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
    // Các controls
    paginationControls,
    sortOption,
    setSearchTerm,
    setSortOption,
    setFilterOptions,
    // Loading states
    loading: !error && !data,
    error: error?.message,
    mutate,
  };
}