"use client";
import CourseDetailLayout from "@/features/courses/components/layout/course-detail";
import { useCourses, useCoursesWithoutFilter } from "@/features/courses/hooks/useCourses";
import useLessons from "@/features/lessons/hooks/useLessons";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();
  const searchParams = useSearchParams();
  
  const { courses, isLoading: coursesLoading, mutate } = useCoursesWithoutFilter();
  const { lessons, duration, loading: lessonsLoading } = useLessons(courseId as string);

  const isLoading = coursesLoading || lessonsLoading;
  const course = !isLoading
    ? courses?.find((course) => course.courseId === courseId)
    : null;

  useEffect(() => {
    const refetch = async () => {
      const refresh = searchParams.get("refresh");
      if (refresh) {
        await mutate();
      }
    };

    refetch();
  }, [mutate, searchParams]);

  return (
    <CourseDetailLayout
      course={course}
      lessons={lessons}
      duration={duration}
      isLoading={isLoading}
    />
  );
};

export default CourseDetailPage;
