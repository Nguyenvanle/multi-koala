"use client";
import { useEffect } from "react"; // Thêm import useEffect
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "@/features/courses/components/atoms/create-course-data-handler";
import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import useMyTeacherCourses from "@/features/courses/hooks/useMyTeacherCourses";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { TeacherCourseSkeletonTemplate } from "@/features/courses/components/atoms/teacher-course-skeleton";

export default function TeacherCoursesPage() {
  const {
    statistics,
    error: statisticError,
    loading: statisticLoading,
  } = useTeacherStatistics();
  const {
    courses,
    error: coursesError,
    loading: coursesLoading,
  } = useMyTeacherCourses();

  // Kiểm tra và reload trang nếu có lỗi
  useEffect(() => {
    if (
      (!statistics && !statisticLoading) ||
      (!courses && !coursesLoading) ||
      statisticError === 401 ||
      coursesError === 401
    ) {
      window.location.reload(); // Reload trang
    }
  }, [
    statistics,
    courses,
    statisticError,
    coursesError,
    statisticLoading,
    coursesLoading,
  ]);

  if (statisticLoading || coursesLoading) {
    return <TeacherCourseSkeletonTemplate />;
  }

  if (!statistics || !courses) {
    return <ErrorMessage />;
  }

  return (
    <TeacherCourseTemplate
      teacherStatistic={statistics}
      teacherMyCourses={courses}
    />
  );
}
