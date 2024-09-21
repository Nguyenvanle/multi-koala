// src/features/courses/pages/CoursesPage.tsx
"use client";

import React, { useEffect } from "react";
import useCourses from "@/features/courses/hooks/useCourses";
import { CoursesTemplate } from "@/features/courses/components/layout/courses";

const CoursesPage: React.FC = () => {
  const { courses, loading, setSortOrder, error } = useCourses(); // xóa một trường

  return (
    <CoursesTemplate
      courses={courses}
      loading={loading}
      setSortOrder={setSortOrder}
    />
  );
};

export default CoursesPage;
