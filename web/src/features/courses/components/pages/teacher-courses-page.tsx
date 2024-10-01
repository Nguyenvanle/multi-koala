"use client";
import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { useEffect } from "react";

export default function TeacherCoursesPage() {
  const { statistics, error, loading } = useTeacherStatistics();

  return <TeacherCourseTemplate teacherStatistic={statistics} />;
}
