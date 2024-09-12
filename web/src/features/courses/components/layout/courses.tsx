// src/features/courses/components/templates/CoursesTemplate.tsx
import { CoursesHeader } from "@/features/courses/components/organisms/courses-header";
import { CoursesList } from "@/features/courses/components/organisms/courses-list";
import { CoursesResultResType } from "@/features/courses/types/course";
import React from "react";

interface CoursesTemplateProps {
  courses: CoursesResultResType | null;
  loading: boolean;
}

export const CoursesTemplate: React.FC<CoursesTemplateProps> = ({
  courses,
  loading,
}) => (
  <div className="flex flex-1 flex-col justify-center gap-4">
    <CoursesHeader />
    <CoursesList courses={courses} loading={loading}/>
  </div>
);
