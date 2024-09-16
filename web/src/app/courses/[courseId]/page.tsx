"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DisplayCard from "@/features/courses/components/molecules/display-card";
import { DetailCard } from "@/features/courses/components/organisms/detail-card";
import { LessonsCardPage } from "@/features/courses/components/pages/lessons";
import useCourses from "@/features/courses/hooks/useCourses";
import useLessons from "@/features/lessons/hooks/useLessons";

export default function CourseDetail({
  params,
}: {
  params: { courseId: string };
}) {
  const { courses, loading: coursesLoading } = useCourses();
  const { lessons, duration, loading: lessonsLoading } = useLessons({ params });

  // Only check for the course if loading is complete
  const isLoading = coursesLoading || lessonsLoading;
  const course = !isLoading
    ? courses?.find((course) => course.courseId === params.courseId)
    : null;

  // Show a loading skeleton while courses or lessons are loading
  if (isLoading) {
    return <Skeleton className="flex w-[96vw] h-[82vh]" />;
  }

  // Handle case when course is not found after loading
  if (!course) {
    return (
      <div className="flex justify-center items-center w-full h-[82vh]">
        No course found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
      <div className="flex flex-col gap-4">
        <DisplayCard
          courseImage={course.image.imageUrl}
          courseName={course.courseName}
        />

        <DetailCard
          courseName={course.courseName}
          coursePrice={course.coursePrice}
          courseDescription={course.courseDescription}
          uploadByTeacher={`${course.uploadedByTeacher.firstname} ${course.uploadedByTeacher.lastname}`}
          totalDuration={duration}
          totalLessons={lessons?.length ?? 0}
          courseRating={course.courseRating}
          courseDiscount={course.discountApprovedRate}
          courseId={course.courseId}
          courseCreateAt={course.courseUploadedAt}
          courseType={course.types}
          courseFields={course.fields}
          courseImage={course.image.imageUrl}
          approvedByAdmin={
            course.approvedByAdmin.firstname + course.approvedByAdmin.lastname
          }
          status={course.status}
          courseLevel={course.courseLevel}
        />
      </div>

      <LessonsCardPage lessons={lessons || []} />
    </div>
  );
}