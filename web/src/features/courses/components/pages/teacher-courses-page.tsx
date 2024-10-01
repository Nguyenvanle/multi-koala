"use client";
import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import useMyTeacherCourses from "@/features/courses/hooks/useMyTeacherCourses";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";

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

  return (
    <TeacherCourseTemplate
      teacherStatistic={statistics}
      teacherMyCourses={courses}
    />
  );
}
