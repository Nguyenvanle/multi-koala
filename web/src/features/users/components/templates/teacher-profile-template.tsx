"use client";

import TeacherProfile from "@/features/users/components/organisms/teacher-profile";
import useTeacherCourses from "@/features/users/hooks/useTeacherCourses";
import useTeacherProfile from "@/features/users/hooks/useTeacherProfile";
import { useParams } from "next/navigation";

export default function TeacherProfileTemplate() {
  const { teacherId } = useParams();
  const {
    teacher,
    loading: teacherLoading,
    error: teacherError,
  } = useTeacherProfile(teacherId as string);
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useTeacherCourses(teacherId as string);

  if (teacherLoading || coursesLoading) return <div>Loading...</div>;
  if (teacherError || coursesError)
    return <div>Error: {teacherError || coursesError}</div>;
  if (!teacher) return <div>Teacher not found</div>;

  return <TeacherProfile teacher={teacher} courses={courses || []} />;
}
