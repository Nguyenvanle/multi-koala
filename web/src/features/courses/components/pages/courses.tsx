// src/features/courses/pages/CoursesPage.tsx
"use client";

import { useState } from "react";
import { CoursesTemplate } from "@/features/courses/components/layout/courses";
import { CoursesResultResType } from "@/features/courses/types/course";
import { GetServerSideProps } from "next";
import { CourseFacade } from "@/features/courses/services/course-facade";
import { CourseRepository } from "@/features/courses/services/course-repository";
import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { useFilter } from "@/features/filter/hooks/useFilter";
import useSWR from "swr";

export interface CoursesProps {
  initialCourses: CoursesResultResType;
}

export const getServerSideProps: GetServerSideProps<
  CoursesProps
> = async () => {
  const courseFacade = new CourseFacade(new CourseRepository());
  const initialCourses = await courseFacade.getProcessedCourses(
    "rating_desc",
    {}
  );

  return {
    props: {
      initialCourses,
    },
  };
};

const fetcher = async (url: string, sortOrder: SortOption, filters: any) => {
  const courseFacade = new CourseFacade(new CourseRepository());
  return courseFacade.getProcessedCourses(sortOrder, filters);
};

export default function Courses({ initialCourses }: CoursesProps) {
  const [sortOrder, setSortOrder] = useState<SortOption>("rating_desc");
  const { filters } = useFilter();

  const {
    data: courses,
    error,
    isLoading: loading,
  } = useSWR(
    ["/api/courses", sortOrder, filters],
    () => fetcher("/api/courses", sortOrder, filters),
    { fallbackData: initialCourses }
  );

  if (error) return <div>ERROR: {error}</div>;

  return (
    <CoursesTemplate
      courses={courses}
      loading={loading}
      setSortOrder={setSortOrder}
    />
  );
};

