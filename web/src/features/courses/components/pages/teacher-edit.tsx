"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CourseEditForm from "@/features/courses/components/layout/teacher-edit";
import { useCoursesWithoutFilter } from "@/features/courses/hooks/useCourses";
import { EditCourseFormData } from "@/features/courses/hooks/useEditCourseForm";
import { CourseFieldResType } from "@/features/courses/types/course-field";
import { CourseTypeResType } from "@/features/courses/types/course-type";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TeacherEditPage() {
  const searchParams = useSearchParams();
  const { courseId } = useParams();
  const {
    courses,
    isLoading: coursesLoading,
    mutate,
  } = useCoursesWithoutFilter();

  const isLoading = coursesLoading;
  const course = !isLoading
    ? courses?.find((c) => c.courseId === courseId)
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

  if (isLoading) {
    return (
      <div className="bg-secondary pr-0 flex flex-grow">
        <div className="w-full p-4 xl:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <Skeleton className="w-full aspect-video rounded-lg h-64 bg-background" />
            <Skeleton className="w-full h-full rounded-lg bg-background" />
          </div>
          <Skeleton className="w-full h-[800px] rounded-lg bg-background" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center w-full h-[82vh]">
        No course found.
      </div>
    );
  }

  const initialData: EditCourseFormData = {
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    coursePrice: course.coursePrice,
    courseLevel: course.courseLevel,
    types: course.types.map((type: CourseTypeResType) => type.typeName),
    fields: course.fields.map((field: CourseFieldResType) => field.fieldName),
    imageUrl: course.image.imageUrl,
  };

  return <CourseEditForm initialData={initialData} />;
}
