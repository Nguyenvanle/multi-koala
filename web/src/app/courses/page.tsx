import CoursesPage, {
  CoursesProps,
} from "@/features/courses/components/pages/courses";

export default function Courses({ initialCourses }: CoursesProps) {
  return <CoursesPage initialCourses={initialCourses} />;
}
