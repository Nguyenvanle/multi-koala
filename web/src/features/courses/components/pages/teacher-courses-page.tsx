"use client";
import { ErrorMessage } from "@/features/courses/components/atoms/create-course-data-handler";
import TeacherCourseTemplate from "@/features/courses/components/layout/teacher-courses-layout";
import useMyTeacherCourses from "@/features/courses/hooks/useMyTeacherCourses";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { TeacherCourseSkeletonTemplate } from "@/features/courses/components/atoms/teacher-course-skeleton";
import { Button } from "@/components/ui/button";

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
