import { CourseCard } from "@/features/courses/components/molecules/course-card";
import { COURSES } from "@/types/course/course";

export default function Courses() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 self-start">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {COURSES.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
