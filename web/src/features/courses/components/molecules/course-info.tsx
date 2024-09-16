// src/features/courses/components/molecules/CourseInfo.tsx
import { Muted } from "@/components/ui/typography";
import { convertDuration } from "@/lib/utils";

type CourseInfoProps = {
  totalDuration: number | null;
  totalLessons: number | null;
  createAt: Date;
};

export const CourseInfo: React.FC<CourseInfoProps> = ({
  totalDuration,
  totalLessons,
  createAt,
}) => {
  const { hours, minutes, seconds } = convertDuration(totalDuration || 0);
  const date = new Date(createAt).toLocaleDateString();

  return (
    <div className="flex flex-row justify-between">
      <Muted>
        {hours > 0
          ? `${hours}h ${minutes}m ${seconds}'`
          : `${minutes}m ${seconds}'`}{" "}
        • {totalLessons} lessons
      </Muted>

      <Muted>{date}</Muted>
    </div>
  );
};
