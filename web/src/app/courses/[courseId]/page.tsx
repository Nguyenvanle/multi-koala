import DetailCard from "@/features/courses/components/molecules/detail-card";
import DisplayCard from "@/features/courses/components/molecules/display-card";
import LessonsCard from "@/features/courses/components/molecules/lessons-card";
import { COURSES } from "@/types/course/course";

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
          {/* <StudentsCard course={course.students} /> */}
        </div>
      </div>
    </>
  );
}
