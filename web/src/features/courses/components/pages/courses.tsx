"use client";

import { CoursesTemplate } from "@/features/courses/components/layout/courses";
import { useCourses } from "@/features/courses/hooks/useCourses";

export default function Courses() {
  const { courses, isLoading, isError, setSortOrder } = useCourses();

  if (isError) return <div>Error loading courses</div>;

  return (
    <CoursesTemplate
      courses={courses || []}
      loading={isLoading}
      setSortOrder={setSortOrder}
    />
  );
}
