import { getTopCourses } from "@/features/courses/actions/get-top-courses";
import {
  MyPerformingCoursesBodyType,
  MyPerformingCoursesResType,
} from "@/features/courses/types/course-perform";
import { useMemo, useState } from "react";
import useSWR from "swr";

interface PaginationOptions {
  pageSize?: number;
  initialPage?: number;
}

export default function useMyPerformingCourses(
  options: PaginationOptions = {}
) {
  const { pageSize = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { data, error, isLoading } = useSWR(`get-top-courses`, () =>
    getTopCourses()
  );

  // Sắp xếp các khóa học theo income giảm dần
  const sortedCourses = data?.courses.sort(
    (a: MyPerformingCoursesBodyType, b: MyPerformingCoursesBodyType) =>
      b.income - a.income
  );

  const courses = useMemo(() => sortedCourses || [], [sortedCourses]);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(courses.length / pageSize);

  // Lấy danh sách courses cho trang hiện tại
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

  return {
    // Dữ liệu đã phân trang
    topCourses: paginatedCourses,
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
    isLoading: isLoading || error,
    error: error,
  };
}
