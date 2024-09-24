import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "../molecules/course-card";
import { CoursesResultResType } from "@/features/courses/types/course";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import Image from "next/image";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import { H1 } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

interface CoursesListProps {
  courses: CoursesResultResType | null;
  loading: boolean;
  className?: string;
  forProfile?: boolean;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  loading,
  className = "px-auto py-8 ", // Đặt giá trị mặc định cho className
  forProfile = false,
}) => {
  // Kiểm tra trạng thái loading
  if (loading) {
    return (
      <div className={`container  ${className}`}>
        <Card className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
          <Skeleton className="flex min-w-[180px] min-h-[460px] " />
        </Card>
      </div>
    );
  }

  // Kiểm tra nếu không có khóa học
  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[500px]">
        <H1 className="text-center text-muted-foreground">NO COURSE FOUND</H1>
      </div>
    );
  }

  // Hiển thị danh sách khóa học
  if (!forProfile)
    return (
      <div className={`container flex ${className}`}>
        <Card
          className={`grid grid-cols-1 sm:grid-cols-2 min-[840px]:grid-cols-3 min-[1100px]:grid-cols-4 gap-6 p-6 `} // Sử dụng template literal để kết hợp className
        >
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
        </Card>
      </div>
    );

  return (
    <div className={`container flex ${className}`}>
      <div
        className={`grid grid-cols-1 min-[540px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-6  `} // Sử dụng template literal để kết hợp className
      >
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
    </div>
  );
};