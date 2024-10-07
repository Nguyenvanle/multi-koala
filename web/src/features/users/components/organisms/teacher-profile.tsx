import React from "react";
import { CoursesResultResType } from "@/features/courses/types/course";
import { TeacherBodyType } from "@/features/users/schema/teacher";
import { CertificationsResult } from "@/features/certification/types/certification-res";
import {
  CertificationsSection,
  CoursesSection,
  TeacherAvatarSection,
  TeacherDetailsSection,
} from "@/features/users/components/molecules";

const TeacherProfile: React.FC<{
  teacher: TeacherBodyType;
  courses: CoursesResultResType;
  courseLoading: boolean;
  certifications: CertificationsResult;
}> = ({ teacher, courses, courseLoading, certifications }) => {
  return (
    <div className="w-full flex flex-col bg-secondary">
      <div className="grid grid-cols-1 space-y-6 lg:grid-cols-3 lg:space-x-6 lg:space-y-0 p-4 xl:p-6 bg-secondary">
        <TeacherAvatarSection teacher={teacher} />
        <TeacherDetailsSection teacher={teacher} />
      </div>
      <CertificationsSection certifications={certifications} />
      <CoursesSection courses={courses} courseLoading={courseLoading} />
    </div>
  );
};

export default TeacherProfile;
