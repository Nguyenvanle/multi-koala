// src/features/courses/components/molecules/CourseInfo.tsx
import { Muted } from "@/components/ui/typography";
import { convertDuration } from "@/lib/utils";

type CourseInfoProps = {
  totalDuration: number | null;
  totalLessons: number | null;
};

export const CourseInfo: React.FC<CourseInfoProps> = ({
  totalDuration,
  totalLessons,
}) => {
  const { hours, minutes, seconds } = convertDuration(totalDuration || 0);

  return (
    <Muted>
      {hours > 0
        ? `${hours}h ${minutes}m ${seconds}'`
        : `${minutes}m ${seconds}'`}{" "}
      • {totalLessons} lessons
    </Muted>
  );
};
