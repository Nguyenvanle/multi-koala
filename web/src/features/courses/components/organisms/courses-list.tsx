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
}

export const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  loading,
  className = "px-auto py-8",
  forProfile = false,
}) => {
  if (loading) {
    return <CoursesListLoading className={className} />;
  }

  if (!courses || courses.length === 0) {
    return <CoursesListEmpty />;
  }

  return (
    <CoursesListGrid
      courses={courses}
      className={className}
      forProfile={forProfile}
    />
  );
};
