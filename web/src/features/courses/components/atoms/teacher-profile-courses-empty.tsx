import { CoursesListEmpty } from "@/features/courses/components/molecules";

interface TeacherProfileCoursesEmptyProps {
  isTeacherProfile?: boolean; // true nếu là profile của giáo viên, false nếu là hệ thống
  isMyProfile?: boolean; // true nếu là profile của người dùng hiện tại
}

export const TeacherProfileCoursesEmpty: React.FC<
  TeacherProfileCoursesEmptyProps
> = ({ isTeacherProfile = false, isMyProfile = false }) => {
  const title = "Looks Like There Are No Courses Yet";

  const getMessage = () => {
    if (isMyProfile) {
      return "It looks like you haven't created any courses yet. Start your teaching journey now!";
    }

    if (isTeacherProfile) {
      return "It looks like this teacher hasn't created any courses yet. Check back later for updates!";
    }

    return "There are currently no courses available in the system.";
  };

  const buttonText = isTeacherProfile
    ? "Create New Course"
    : "Browse All Courses";

  const getLink = () => {
    if (isTeacherProfile) {
      return "/dashboard/courses/add";
    } else {
      return "/dashboard/courses";
    }
  };

  return (
    <CoursesListEmpty
      title={title}
      message={getMessage()}
      buttonText={buttonText}
      redirect={getLink()}
    />
  );
};
