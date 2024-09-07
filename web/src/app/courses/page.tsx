"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { H1, H2, H4 } from "@/components/ui/typography";
import { CourseCard } from "@/features/courses/components/molecules/course-card";
import useCourses from "@/features/courses/hooks/useCourses";
import Link from "next/link";

export default function Courses() {
  const { courses } = useCourses();

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4">
      <H2>Latest Courses</H2>
      <div className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!courses || courses.length === 0 ? (
          <Skeleton className="flex w-[94vw] h-[800px]" />
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
