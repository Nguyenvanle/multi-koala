import TeacherCoursesPage from "@/features/courses/components/pages/teacher-courses-page";
import { Suspense } from "react";

export default function TeachingCourses() {
  return (
    <Suspense>
      <TeacherCoursesPage />
    </Suspense>
  );
}
