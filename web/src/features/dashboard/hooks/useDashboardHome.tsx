import useMyPerformingCourses from "@/features/courses/hooks/useMyPerformingCourses";
import { TeacherRatingBodyType } from "@/features/rating/types/teacher-rating";
import { useTeacherStatistics } from "@/features/users/hooks/useTeacherStatistics";
import { teacherService } from "@/features/users/services/teacher";
import useSWR from "swr";

const fetcher = async (
  teacherId: string
): Promise<TeacherRatingBodyType | null> => {
  const { result: data } = await teacherService.getRating(teacherId);
  if (!data?.result) {
    throw new Error("Failed to fetch teacher rating");
  }
  return data.result;
};

export default function useDashboardHome() {
  const { statistics, loading: statisticLoading } = useTeacherStatistics();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user ? user.userId : null;

  const { data: rating, isLoading: ratingLoading } =
    useSWR<TeacherRatingBodyType | null>(
      userId ? `teacher-rating-${userId}` : null,
      () => (userId ? fetcher(userId) : null)
    );
  const teacherRating = rating?.avgteacherRating ?? 0;

  const {topCourses, isLoading: topCoursesLoading} = useMyPerformingCourses()

  return {
    statistics,
    userId,
    teacherRating,
    topCourses,
    statisticLoading,
    ratingLoading,
    topCoursesLoading,
  };
}
