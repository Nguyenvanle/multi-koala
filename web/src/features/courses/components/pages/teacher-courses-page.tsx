"use client";

import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import useMyTeacherCourses from "@/features/courses/hooks/useMyTeacherCourses";

export default function TeacherCoursesPage() {
  const {
    courses,
    loading: coursesLoading,
    mutate: mutateCourses,
    setSearchTerm,
    setFilterOptions,
    setSortOption,
    sortOption,
    pagination,
    paginationControls,
  } = useMyTeacherCourses({
    pageSize: 4,
    initialPage: 1,
  });

  // render
  return (
    <TeacherCourseTemplate
      teacherMyCourses={courses}
      setSearchTerm={setSearchTerm}
      setFilterOptions={setFilterOptions}
      setSortOption={setSortOption}
      mutateCourses={mutateCourses}
      currentSort={sortOption}
      controls={paginationControls}
      pagination={pagination}
      coursesLoading={coursesLoading}
    />
  );
}