import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "../molecules/course-card";
import { CoursesResultResType } from "@/features/courses/types/course";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import Image from "next/image";

interface CoursesListProps {
  courses: CoursesResultResType | null;
  loading: boolean;
  className?: string;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  loading,
  className = "", // Đặt giá trị mặc định cho className
}) => {
  // Kiểm tra trạng thái loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Skeleton className="flex min-w-[180px] min-h-[460px]" />
        <Skeleton className="flex min-w-[180px] min-h-[460px]" />
        <Skeleton className="flex min-w-[180px] min-h-[460px]" />
        <Skeleton className="flex min-w-[180px] min-h-[460px]" />
      </div>
    );
  }

  // Kiểm tra nếu không có khóa học
  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[500px]">
        <div className="flex flex-col h-[500px] w-[600px] mr-2 relative">
          <Image
            src="https://img.freepik.com/free-vector/404-error-template-flat-style_23-2147756470.jpg?t=st=1726920178~exp=1726923778~hmac=1fdf153f66ad19718e5efcf6871f230920cc963d8b5f88a2a118f53f5a5145bb&w=740"
            alt="Image"
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
          />
        </div>
      </div>
    );
  }

  // Hiển thị danh sách khóa học
  return (
    <div
      className={`grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`} // Sử dụng template literal để kết hợp className
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
              courseRating={course.courseRating}
              courseLevel={course.courseLevel}
              courseDiscount={discountedPrice}
            />
          </Link>
        );
      })}
    </div>
  );
};