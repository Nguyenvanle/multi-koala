"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CourseEditForm from "@/features/courses/components/layout/teacher-edit";
import { useCoursesWithoutFilter } from "@/features/courses/hooks/useCourses";
import { EditCourseFormData } from "@/features/courses/hooks/useEditCourseForm";
import { CourseFieldResType } from "@/features/courses/types/course-field";
import { CourseTypeResType } from "@/features/courses/types/course-type";
import useLessons from "@/features/lessons/hooks/useLessons";
import { useParams } from "next/navigation";
import { useEffect } from "react";

let isReload = false;

export default function TeacherEditPage() {
  const { courseId } = useParams();
  const { courses, isLoading: coursesLoading } = useCoursesWithoutFilter();
  const {
    lessons,
    duration,
    loading: lessonsLoading,
  } = useLessons(courseId as string);

  const isLoading = coursesLoading || lessonsLoading;
  const course = !isLoading
    ? courses?.find((course) => course.courseId === courseId)
    : null;

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

  if (!course && courseId && !isReload) {
    console.log("Mutating courses data due to mismatch...");
    isReload = true;
    location.reload();
  } 

  if (!course) {
    return (
      <div className="flex justify-center items-center w-full h-[82vh]">
        No course found.
      </div>
    );
  }

  // Sử dụng toán tử nullish coalescing (??) để cung cấp giá trị mặc định nếu null
  const approvedByAdmin = course.approvedByAdmin
    ? `${course.approvedByAdmin.firstname} ${course.approvedByAdmin.lastname}`
    : "N/A"; // Hoặc một giá trị mặc định khác

  const uploadedByTeacher = course.uploadedByTeacher
    ? `${course.uploadedByTeacher.firstname} ${course.uploadedByTeacher.lastname}`
    : "N/A"; // Hoặc một giá trị mặc định khác

  const initialData: EditCourseFormData = {
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    coursePrice: course.coursePrice,
    courseLevel: course.courseLevel,
    types: course.types.map((type: CourseTypeResType) => type.typeName),
    fields: course.fields.map((field: CourseFieldResType) => field.fieldName),
    imageUrl: course.image.imageUrl,
  };

  return <CourseEditForm initialData={initialData}></CourseEditForm>;
}
