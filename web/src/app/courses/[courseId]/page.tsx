"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DetailCard from "@/features/courses/components/molecules/detail-card";
import DisplayCard from "@/features/courses/components/molecules/display-card";
import StudentsCard from "@/features/courses/components/molecules/students-card";
import useCourses from "@/features/courses/hooks/useCourses";
import useLessons from "@/features/lessons/hooks/useLessons";
import { COURSES } from "@/types/course/data";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const LessonsCard = dynamic(
  () => import("@/features/courses/components/molecules/lessons-card"),
  {
    loading: () => <Skeleton className="h-20 w-full" />,
  }
);

export default function CourseDetail({
  params,
}: {
  params: { courseId: string };
}) {
  const { courses } = useCourses();
  const { lessons } = useLessons();

  useEffect(() => {
    console.log(lessons);
  }, [lessons]);

  const course = courses?.find((course) => course.courseId === params.courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <>
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
            uploadByTeacher={
              course.uploadedByTeacher.firstname +
              course.uploadedByTeacher.lastname
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <LessonsCard {...course} />
          <StudentsCard {...course} />
        </div>
      </div>
    </>
  );
}
