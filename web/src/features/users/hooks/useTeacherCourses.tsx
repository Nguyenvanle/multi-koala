import { CoursesResultResType } from "@/features/courses/types/course";
import { teacherService } from "@/features/users/services/teacher";
import { COURSE_VERIFY } from "@/types/course/verify";
import useSWR from "swr";

export function useTeacherCourses(teacherId: string) {
  const { data, error } = useSWR(`teacher-courses-${teacherId}`, () =>
    teacherService.getAllCourses(teacherId)
  );

  const courses = data?.result?.result as CoursesResultResType;
  const approvedCourses = courses?.filter(
    (course) =>
      COURSE_VERIFY.safeParse(course.status).success &&
      course.status === "APPROVED"
  );

  return {
    courses,
    approvedCourses,
    loading: !error && !data,
    error: error?.message,
  };
}