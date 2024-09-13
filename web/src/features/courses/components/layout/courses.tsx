// src/features/courses/components/templates/CoursesTemplate.tsx
import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { CoursesHeader } from "@/features/courses/components/organisms/courses-header";
import { CoursesList } from "@/features/courses/components/organisms/courses-list";
import { CoursesResultResType } from "@/features/courses/types/course";
import React, { Dispatch, SetStateAction } from "react";

interface CoursesTemplateProps {
  courses: CoursesResultResType | null;
  loading: boolean;
  setSortOrder: Dispatch<SetStateAction<SortOption>>;
}

export const CoursesTemplate: React.FC<CoursesTemplateProps> = ({
  courses,
  loading,
  setSortOrder,
}) => (
  <div className="flex flex-1 flex-col justify-center gap-4">
    <CoursesHeader setSortOrder={setSortOrder} />
    <CoursesList courses={courses} loading={loading} />
  </div>
);