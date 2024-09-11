// src/features/courses/pages/CoursesPage.tsx
"use client";

import React from "react";
import useCourses from "@/features/courses/hooks/useCourses";
import { CoursesTemplate } from "@/features/courses/components/layout/courses";

const CoursesPage: React.FC = () => {
  const { courses } = useCourses();

  return <CoursesTemplate courses={courses} />;
};

export default CoursesPage;
