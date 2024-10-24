"use client";
import { ErrorMessage } from "@/features/courses/components/atoms/create-course-data-handler";
import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import useMyTeacherCourses from "@/features/courses/hooks/useMyTeacherCourses";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { TeacherCourseSkeletonTemplate } from "@/features/courses/components/atoms/teacher-course-skeleton";
import { useEffect } from "react";

export default function TeacherCoursesPage() {
  // custom hooks
  const {
    statistics,
    loading: statisticLoading,
  } = useTeacherStatistics();
  const {
    courses,
    loading: coursesLoading,
    mutate: mutateCourses,
    setSearchTerm,
    setFilterOptions,
    setSortOption,
    sortOption,
  } = useMyTeacherCourses({
    pageSize: 5,
    initialPage: 1,
  });

  // refetch
  useEffect(() => {
    if (statistics?.totalCourses > courses?.length) {
      mutateCourses();
    }
  }, [statistics, courses, mutateCourses]);

  // loading
  const isLoading = statisticLoading || coursesLoading;
  if (isLoading) {
    return <TeacherCourseSkeletonTemplate />;
  }
  if (!statistics || !courses) {
    return <ErrorMessage />;
  }

  // render
  return (
    <TeacherCourseTemplate
      teacherStatistic={statistics}
      teacherMyCourses={courses}
      setSearchTerm={setSearchTerm}
      setFilterOptions={setFilterOptions}
      setSortOption={setSortOption}
      currentSort={sortOption}
    />
  );
}