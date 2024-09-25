import { Skeleton } from "@/components/ui/skeleton";
import { TeacherRatingBodyType } from "@/features/rating/types/teacher-rating";
import { InfoItem } from "@/features/users/components/atoms/info-item";
import { teacherService } from "@/features/users/services/teacher";
import { Star } from "lucide-react";
import { GetServerSideProps } from "next";
import useSWR from "swr";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const teacherId = context.params?.id as string;
    if (!teacherId) {
      throw new Error("Teacher ID is required");
    }
    const { result } = await teacherService.getRating(teacherId);
    return {
      props: {
        initialData: result || null,
        teacherId,
      },
    };
  } catch (error) {
    console.error("Failed to fetch teacher rating:", error);
    return {
      props: {
        initialData: null,
        teacherId: null,
      },
    };
  }
};

const fetcher = async (
  teacherId: string
): Promise<TeacherRatingBodyType | null> => {
  const { result: data } = await teacherService.getRating(teacherId);
  if (!data?.result) {
    throw new Error("Failed to fetch teacher rating");
  }
  return data.result;
};

const TeacherRatingItem: React.FC<{
  initialData: TeacherRatingBodyType | null;
  teacherId: string | null;
}> = ({ initialData, teacherId }) => {
  const {
    data: rating,
    error,
    isLoading,
  } = useSWR<TeacherRatingBodyType | null>(
    teacherId ? `teacher-rating-${teacherId}` : null,
    () => (teacherId ? fetcher(teacherId) : null),
    {
      fallbackData: initialData,
    }
  );

  if (isLoading) return <InfoItem icon={Star} label="Rating" value={`0.0/5`} />;
  if (error) return <InfoItem icon={Star} label="Rating" value={`${error}`} />;
  if (!rating)
    return <InfoItem icon={Star} label="Rating" value={`No rating found`} />;

  const teacherRating = rating.avgteacherRating || 0; // Lấy giá trị trung bình từ xếp hạng

  return (
    <InfoItem
      icon={Star}
      label="Rating"
      value={`${(teacherRating * 5).toFixed(1)} / 5`}
    />
  );
};

export default TeacherRatingItem;
