"use client";

import { useAuth } from "@/features/auth/contexts/auth-context";
import { getRecentEnroll } from "@/features/enroll-courses/actions/get-recent-enroll";
import { RecentEnrollBodyType } from "@/features/enroll-courses/types/recent-enroll";
import useSWR from "swr";
import { useState, useMemo } from 'react';

interface PaginationOptions {
  pageSize?: number;
  initialPage?: number;
}

export default function useEnrollCourses(options: PaginationOptions = {}) {
  const { pageSize = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { logout } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    `recently-student-enrolled-my-courses`,
    () => getRecentEnroll()
  );

  const students = useMemo(() => data?.student as RecentEnrollBodyType[] || [], [data?.student])
  
  // Tính toán tổng số trang
  const totalPages = Math.ceil(students.length / pageSize);
  
  // Lấy danh sách students cho trang hiện tại
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return students.slice(startIndex, endIndex);
  }, [students, currentPage, pageSize]);

  // Các hàm điều hướng trang
  const goToPage = (page: number) => {
    const validatedPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validatedPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    // Dữ liệu đã phân trang
    students: paginatedStudents,
    // Metadata phân trang
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      totalItems: students.length,
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
    // Các trạng thái khác
    loading: isLoading,
    error: error?.message,
    mutate,
  };
}