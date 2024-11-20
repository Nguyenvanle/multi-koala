import TeacherCoursesPage from "@/features/courses/components/pages/teacher-courses-page";
import { Suspense } from "react";

export default async function TeachingCourses() {
  return (
    <Suspense>
      <TeacherCoursesPage />
    </Suspense>
  );
}
