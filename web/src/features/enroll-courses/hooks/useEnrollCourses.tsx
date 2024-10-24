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

interface FilterOptions {
  studentName?: string;
  courseName?: string;
  courseStatus?: string;
}

interface SortOptions {
  field: keyof RecentEnrollBodyType;
  direction: "asc" | "desc";
}

export default function useEnrollCourses(options: PaginationOptions = {}) {
  const { pageSize = 10, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm
  const [filters, setFilters] = useState<FilterOptions>({}); // Bộ lọc
  const [sort, setSort] = useState<SortOptions>({ field: "enrollAt", direction: "desc" }); // Sắp xếp
  const { logout } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    `recently-student-enrolled-my-courses`,
    () => getRecentEnroll()
  );

  const students = useMemo(() => data?.student as RecentEnrollBodyType[] || [], [data?.student]);

  // Áp dụng tìm kiếm
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.courseName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        (!filters.studentName || student.studentName.toLowerCase().includes(filters.studentName.toLowerCase())) &&
        (!filters.courseName || student.courseName.toLowerCase().includes(filters.courseName.toLowerCase())) &&
        (!filters.courseStatus || student.status === filters.courseStatus);

      return matchesSearch && matchesFilter;
    });
  }, [students, searchQuery, filters]);

  // Áp dụng sắp xếp
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sort.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredStudents, sort]);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(sortedStudents.length / pageSize);

  // Lấy danh sách sinh viên cho trang hiện tại
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedStudents.slice(startIndex, endIndex);
  }, [sortedStudents, currentPage, pageSize]);

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

  // Cập nhật tìm kiếm
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Đặt lại trang khi tìm kiếm
  };

  // Cập nhật lọc
  const handleFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Đặt lại trang khi lọc
  };

  // Cập nhật sắp xếp
  const handleSort = (field: keyof RecentEnrollBodyType, direction: "asc" | "desc") => {
    setSort({ field, direction });
  };

  return {
    // Dữ liệu đã phân trang
    students: paginatedStudents,
    // Metadata phân trang
    pagination: {
      currentPage,
      totalPages,
      pageSize,
      totalItems: sortedStudents.length,
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
    // Các hàm tìm kiếm, lọc, sắp xếp
    search: {
      handleSearch,
      searchQuery,
    },
    filter: {
      handleFilter,
      filters,
    },
    sort: {
      handleSort,
      sort,
    },
    // Các trạng thái khác
    loading: isLoading,
    error: error?.message,
    mutate,
  };
}
