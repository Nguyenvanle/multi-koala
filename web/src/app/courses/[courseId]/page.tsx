import { Skeleton } from "@/components/ui/skeleton";
import DetailCard from "@/features/courses/components/molecules/detail-card";
import DisplayCard from "@/features/courses/components/molecules/display-card";
import StudentsCard from "@/features/courses/components/molecules/students-card";
import { COURSES } from "@/types/course/data";
import dynamic from "next/dynamic";

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
  // return <div>CourseDetail: {params.courseId}</div>;
  const course = COURSES.find((course) => course.courseId === params.courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-4">
          <DisplayCard {...course} />
          <DetailCard {...course} />
        </div>
        <div className="flex flex-col gap-4">
          <LessonsCard {...course} />
          <StudentsCard {...course} />
        </div>
      </div>
    </>
  );
}
