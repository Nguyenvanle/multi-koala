"use client";
import { ErrorMessage } from "@/features/courses/components/atoms/create-course-data-handler";
import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import useMyTeacherCourses from "@/features/courses/hooks/useMyTeacherCourses";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { TeacherCourseSkeletonTemplate } from "@/features/courses/components/atoms/teacher-course-skeleton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function TeacherCoursesPage() {
  const {
    statistics,
    error: statisticError,
    loading: statisticLoading,
    mutate: mutateStatistics, // Để thử lại khi có lỗi
  } = useTeacherStatistics();

  const {
    courses,
    error: coursesError,
    loading: coursesLoading,
    mutate: mutateCourses, // Sử dụng mutate để refetch dữ liệu khi retry
  } = useMyTeacherCourses();

  // Sử dụng useEffect để kiểm tra và cập nhật lại courses nếu cần
  useEffect(() => {
    if (statistics && courses) {
      console.log("Total Courses:", statistics.totalCourses);
      console.log("Loaded Courses Length:", courses.length);

      if (statistics.totalCourses > courses.length) {
        console.log("Mutating courses data due to mismatch...");
        mutateCourses(); // Refetch lại dữ liệu courses nếu số totalCourses lớn hơn số courses hiện tại
      } else {
        console.log("No need to mutate. Data is consistent.");
      }
    }
  }, [statistics, courses, mutateCourses]);

  // Kiểm tra nếu có lỗi và cho phép retry
  const handleRetry = () => {
    if (statisticError) {
      mutateStatistics(); // Thử lại fetch statistics
    }
    if (coursesError) {
      mutateCourses(); // Thử lại fetch courses
    }
  };

  // Nếu đang load dữ liệu
  if (statisticLoading || coursesLoading) {
    return <TeacherCourseSkeletonTemplate />;
  }

  // Nếu có lỗi thì hiển thị thông báo lỗi và nút retry
  if (statisticError || coursesError) {
    return (
      <div className="flex flex-1">
        <ErrorMessage />
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  // Nếu không có dữ liệu
  if (!statistics || !courses) {
    return <ErrorMessage />;
  }

  // Render template với dữ liệu đã load thành công
  return (
    <TeacherCourseTemplate
      teacherStatistic={statistics}
      teacherMyCourses={courses}
    />
  );
}
