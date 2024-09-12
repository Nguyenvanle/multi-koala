// src/features/courses/components/organisms/CoursesList.tsx
import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "../molecules/course-card";
import { CoursesResultResType } from "@/features/courses/types/course";

interface CoursesListProps {
  courses: CoursesResultResType | null;
  loading: boolean;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  loading,
}) => {
  // Kiểm tra trạng thái loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Skeleton className="flex w-[94vw] h-[500px]" />
        <Skeleton className="flex w-[94vw] h-[500px]" />
        <Skeleton className="flex w-[94vw] h-[500px]" />
        <Skeleton className="flex w-[94vw] h-[500px]" />
      </div>
    );
  }

  // Kiểm tra nếu không có khóa học
  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[500px]">
        <p className="text-lg ">No courses found.</p>
      </div>
    );
  }

  // Hiển thị danh sách khóa học
  return (
    <div className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <Link key={course.courseId} href={`/courses/${course.courseId}`}>
          <CourseCard
            courseId={course.courseId}
            courseName={course.courseName}
            courseCreateAt={course.courseUploadedAt}
            coursePrice={course.coursePrice}
            courseDescription={course.courseDescription}
            courseType={course.types}
            courseFields={course.fields}
            courseImage={course.image.imageUrl || ""}
            uploadByTeacher={
              course.uploadedByTeacher
                ? `${course.uploadedByTeacher.firstname} ${course.uploadedByTeacher.lastname}`
                : ""
            }
            approvedByAdmin={
              course.approvedByAdmin
                ? `${course.approvedByAdmin.firstname} ${course.approvedByAdmin.lastname}`
                : ""
            }
            status={course.status}
            courseRating={course.courseRating}
            courseLevel={course.courseLevel}
          />
        </Link>
      ))}
    </div>
  );
};