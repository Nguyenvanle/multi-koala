import { Card } from "@/components/ui/card";
import { TeacherProfileCoursesEmpty } from "@/features/courses/components/atoms/teacher-profile-courses-empty";
import {
  CoursesListEmpty,
  CoursesListGrid,
  CoursesListLoading,
} from "@/features/courses/components/molecules";
import { CoursesResultResType } from "@/features/courses/types/course";

interface CoursesListProps {
  courses: CoursesResultResType | null;
  loading: boolean;
  className?: string;
  forProfile?: boolean;
  myProfile?: boolean;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  loading,
  className = "px-auto py-8",
  forProfile,
  myProfile,
}) => {
  if (loading) {
    return <CoursesListLoading className={className} />;
  }

  if (!courses || courses.length === 0) {
    if (forProfile)
      return (
        <TeacherProfileCoursesEmpty
          isTeacherProfile={forProfile}
          isMyProfile={myProfile}
        />
      );

    return (
      <div className="w-full p-4   pt-0 xl:p-6 xl:pt-0">
        <Card>
          <TeacherProfileCoursesEmpty
            isTeacherProfile={forProfile}
            isMyProfile={myProfile}
          />
        </Card>
      </div>
    );
  }

  return (
    <CoursesListGrid
      courses={courses}
      className={className}
      forProfile={forProfile}
    />
  );
};
