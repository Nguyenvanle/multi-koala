// File: src/features/courses/components/molecules/CoursesListGrid.tsx
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CoursesResultResType } from "@/features/courses/types/course";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import { CourseCard } from "@/features/courses/components/molecules/course-card";

interface CoursesListGridProps {
  courses: CoursesResultResType;
  className?: string;
  forProfile?: boolean;
}

export const CoursesListGrid: React.FC<CoursesListGridProps> = ({
  courses,
  className,
  forProfile,
}) => {
  const gridClassName = forProfile
    ? "grid grid-cols-1 min-[540px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-6"
    : "grid grid-cols-1 sm:grid-cols-2 min-[840px]:grid-cols-3 min-[1100px]:grid-cols-4 gap-6 p-6";

  const content = (
    <div className={gridClassName}>
      {courses.map((course) => {
        const discountedPrice = DiscountAdapter.getDiscountedPrice(course);
        return (
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
              courseRating={RatingAdapter.getRating(course.courseId)}
              courseLevel={course.courseLevel}
              courseDiscount={discountedPrice}
            />
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className={`container flex ${className}`}>
      {forProfile ? content : <Card className="w-full">{content}</Card>}
    </div>
  );
};
