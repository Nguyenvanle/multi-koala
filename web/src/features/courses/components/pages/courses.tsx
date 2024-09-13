// src/features/courses/pages/CoursesPage.tsx
"use client";

import React from "react";
import useCourses from "@/features/courses/hooks/useCourses";
import { CoursesTemplate } from "@/features/courses/components/layout/courses";

const CoursesPage: React.FC = () => {
  const { courses, loading, setSortOrder, setFilterKeyword } = useCourses();

  return (
    <CoursesTemplate
      courses={courses}
      loading={loading}
      setSortOrder={setSortOrder}
      setFilterKeyword={setFilterKeyword}
    />
  );
};

export default CoursesPage;
