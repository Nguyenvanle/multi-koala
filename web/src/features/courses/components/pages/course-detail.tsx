"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DisplayCard from "@/features/courses/components/molecules/display-card";
import DetailCard from "@/features/courses/components/organisms/detail-card";
import { LessonsCardPage } from "@/features/courses/components/pages/lessons";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import useLessons from "@/features/lessons/hooks/useLessons";

interface CourseDetailProps {
  courseId: string;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId }) => {
  const { courses, isLoading: coursesLoading } = useCourses();
  const {
    lessons,
    duration,
    loading: lessonsLoading,
  } = useLessons({ params: { courseId } });

  const isLoading = coursesLoading || lessonsLoading;
  const course = !isLoading
    ? courses?.find((course) => course.courseId === courseId)
    : null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
        <div className="flex flex-col gap-6">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <Skeleton className="w-full h-[300px] rounded-lg" />
        </div>
        <Skeleton className="w-full h-[800px] rounded-lg" />
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

  return (
    <div className="container px-auto py-9 grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
      <div className="flex flex-col gap-6">
        <DisplayCard
          courseImage={course.image.imageUrl}
          courseName={course.courseName}
        />
        <LessonsCardPage lessons={lessons || []} />
      </div>

      <DetailCard
        courseName={course.courseName}
        coursePrice={course.coursePrice}
        courseDescription={course.courseDescription}
        uploadByTeacher={`${course.uploadedByTeacher.firstname} ${course.uploadedByTeacher.lastname}`}
        totalDuration={duration}
        totalLessons={lessons?.length ?? 0}
        courseRating={RatingAdapter.getRating(course.courseId)}
        courseDiscount={DiscountAdapter.getDiscountedPrice(course)}
        courseId={course.courseId}
        courseCreateAt={course.courseUploadedAt}
        courseType={course.types}
        courseFields={course.fields}
        courseImage={course.image.imageUrl}
        approvedByAdmin={`${course.approvedByAdmin.firstname} ${course.approvedByAdmin.lastname}`}
        status={course.status}
        courseLevel={course.courseLevel}
        teacherId={course.uploadedByTeacher.userId}
      />
    </div>
  );
};

export default CourseDetail;
