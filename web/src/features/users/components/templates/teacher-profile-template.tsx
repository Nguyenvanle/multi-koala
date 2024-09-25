"use client";

import TeacherProfileSkeleton from "@/features/users/components/atoms/teacher-profile-skeleton";
import TeacherProfile from "@/features/users/components/organisms/teacher-profile";
import { useParams } from "next/navigation";
import { useTeacherProfile } from "@/features/users/hooks/useTeacherProfile";
import { useTeacherCourses } from "@/features/users/hooks/useTeacherCourses";
import { useTeacherCertifications } from "@/features/users/hooks/useTeacherCertifications";

export default function TeacherProfileTemplate() {
  const { teacherId } = useParams();

  const {
    teacher,
    loading: teacherLoading,
    error: teacherError,
  } = useTeacherProfile(teacherId as string);

  const {
    approvedCourses: courses,
    loading: coursesLoading,
    error: coursesError,
  } = useTeacherCourses(teacherId as string);

  const {
    certifications,
    loading: certificationsLoading,
    error: certificationsError,
  } = useTeacherCertifications(teacherId as string);

  if (teacherLoading || coursesLoading || certificationsLoading)
    return <TeacherProfileSkeleton />;

  if (teacherError || coursesError || certificationsError)
    return (
      <div>Error: {teacherError || coursesError || certificationsError}</div>
    );

  if (!teacher) return <div>Teacher not found</div>;

  return (
    <TeacherProfile
      teacher={teacher}
      courses={courses || []}
      courseLoading={coursesLoading}
      certifications={certifications || []}
    />
  );
}