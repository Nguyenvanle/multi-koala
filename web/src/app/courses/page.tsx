
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { CourseCard } from "@/features/courses/components/molecules/course-card";
import { COURSES } from "@/types/course/course";
import Link from "next/link";

export default function Courses() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4">
      <H1>Available Courses</H1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {COURSES.map((course) => (
          <Link key={course.courseId} href={`/courses/${course.courseId}`}>
            <CourseCard {...course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
