"use client";

import { H1 } from "@/components/ui/typography";
import { CourseCard } from "@/features/courses/components/molecules/course-card";
import useCourses from "@/features/courses/hooks/useCourses";
import Link from "next/link";

export default function Courses() {
  const { courses } = useCourses();

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4">
      <H1>Available Courses</H1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!courses || courses.length === 0 ? (
          <H1>404</H1>
        ) : (
          courses.map((course) => (
            <Link key={course.courseId} href={`/courses/${course.courseId}`}>
              <CourseCard
                courseId={course.courseId}
                courseName={course.courseName}
                courseCreateAt={course.courseUploadedAt}
                coursePrice={course.coursePrice}
                courseDescription={course.courseDescription}
                courseType={course.types
                  .map((type) => type.typeName)
                  .join(", ")}
                courseImage={course.image.imageUrl || ""}
                uploadByTeacher={
                  course.uploadedByTeacher?.firstname +
                    " " +
                    course.uploadedByTeacher?.lastname || ""
                }
                approvedByAdmin={
                  course.approvedByAdmin?.firstname +
                    " " +
                    course.approvedByAdmin?.lastname || ""
                }
                status={course.status}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}