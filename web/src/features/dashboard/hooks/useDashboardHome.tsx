"use client";

import { useState, useEffect, useMemo } from "react";
import useMyPerformingCourses from "@/features/courses/hooks/useMyPerformingCourses";
import { TeacherRatingBodyType } from "@/features/rating/types/teacher-rating";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { teacherService } from "@/features/users/services/teacher";
import useSWR from "swr";
import { UserBodyType } from "@/features/users/schema/user";
import useEnrollCourses from "@/features/enroll-courses/hooks/useEnrollCourses";
import { PaginationControlProps, PaginationProps } from "@/features/pagination/types/pagination";

// Define student type
interface Student {
  status: string;
  studentName: string;
  courseName: string;
  coursePrice: number;
  studentEmail: string;
  process: number;
  enrollAt: string;
}

// Define allowed sort fields
type SortableFields = keyof Student;

interface FilterParams {
  studentName?: string;
  courseStatus?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

interface SortParams {
  field: SortableFields;
  direction: "asc" | "desc";
}

const fetcher = async (
  teacherId: string
): Promise<TeacherRatingBodyType | null> => {
  const { result: data } = await teacherService.getRating(teacherId);
  if (!data?.result) {
    throw new Error("Failed to fetch teacher rating");
  }
  return data.result;
};

export default function useDashboardHome() {
  const [user, setUser] = useState<UserBodyType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterParams>({});
  const [sort, setSort] = useState<SortParams>({
    field: "enrollAt",
    direction: "desc",
  });

  // Pagination state using PaginationProps
  const [pagination, setPagination] = useState<PaginationProps>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 4,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const { statistics, loading: statisticLoading } = useTeacherStatistics();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const userId = user ? user.userId : null;

  const { data: rating, isLoading: ratingLoading } =
    useSWR<TeacherRatingBodyType | null>(
      userId ? `teacher-rating-${userId}` : null,
      () => (userId ? fetcher(userId) : null)
    );

  const teacherRating = rating?.avgteacherRating ?? 0;

  const { topCourses, isLoading: topCoursesLoading } = useMyPerformingCourses({
    pageSize: pagination.pageSize + 1,
    initialPage: pagination.currentPage,
  });

  const { students, loading: recentEnrollLoading } = useEnrollCourses({
    pageSize: pagination.pageSize,
    initialPage: pagination.currentPage,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleFilter = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSort = (field: SortableFields, direction: "asc" | "desc") => {
    setSort({ field, direction });
  };

  // Pagination controls using PaginationControlProps
  const paginationControls: PaginationControlProps = {
    goToPage: (page: number) => {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    },
    nextPage: () => {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
        hasNextPage: prev.currentPage < prev.totalPages,
      }));
    },
    previousPage: () => {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
        hasPreviousPage: prev.currentPage > 1,
      }));
    },
    resetPage: () => {
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    },
  };

  const processedStudents = useMemo(() => {
    if (!students) return [];
  
    let result = [...students] as Student[];
  
    // Tìm kiếm theo tên học viên hoặc tên khóa học
    if (searchQuery) {
      result = result.filter(
        (student) =>
          student.studentName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          student.courseName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          student.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Lọc theo các filter khác
    if (filters.studentName) {
      result = result.filter((student) =>
        student.studentName
          .toLowerCase()
          .includes(filters.studentName!.toLowerCase())
      );
    }
  
    if (filters.courseStatus) {
      result = result.filter(
        (student) => student.status === filters.courseStatus
      );
    }
  
    if (filters.dateRange) {
      result = result.filter((student) => {
        const enrollDate = new Date(student.enrollAt);
        return (
          enrollDate >= filters.dateRange!.start &&
          enrollDate <= filters.dateRange!.end
        );
      });
    }
  
    // Sắp xếp
    result.sort((a, b) => {
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
  
    return result;
  }, [students, searchQuery, filters, sort]);
  

  const totalItems = processedStudents.length;
  const totalPages = Math.ceil(totalItems / pagination.pageSize);

  // Update pagination details
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems,
      totalPages,
      hasNextPage: prev.currentPage < totalPages,
      hasPreviousPage: prev.currentPage > 1,
    }));
  }, [totalItems, totalPages]);

  const paginatedStudents = processedStudents.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );

  return {
    // Original data
    statistics,
    userId,
    teacherRating,
    topCourses,

    // Processed data
    students: paginatedStudents,
    totalItems,
    totalPages,
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,

    // Loading states
    statisticLoading,
    ratingLoading,
    topCoursesLoading,
    recentEnrollLoading,

    // Actions
    handleSearch,
    handleFilter,
    handleSort,
    handlePageChange: paginationControls.goToPage,
    handlePageSizeChange: (newPageSize: number) =>
      setPagination({ ...pagination, pageSize: newPageSize }),

    // Pagination controls
    paginationControls,

    // Current states
    searchQuery,
    filters,
    sort,
  };
}
