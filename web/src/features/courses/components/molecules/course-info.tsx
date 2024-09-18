// src/features/courses/components/molecules/CourseInfo.tsx
import { Muted, P } from "@/components/ui/typography";
import { getLevelColor } from "@/features/courses/libs/level";
import { convertDuration } from "@/lib/utils";
import {
  Clock,
  BookOpen,
  Calendar,
  Star,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import React from "react";

type CourseInfoProps = {
  totalDuration: number | null;
  totalLessons: number | null;
  createAt: Date;
  courseLevel: string; // Thêm prop cho level khóa học
  className?: string; // Thêm prop để tùy chỉnh kiểu chữ
};

export const CourseInfo: React.FC<CourseInfoProps> = ({
  totalDuration,
  totalLessons,
  createAt,
  courseLevel,
  className,
}) => {
  const { hours, minutes } = convertDuration(totalDuration || 0);
  const date = new Date(createAt).toLocaleDateString();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded border">
      <div className="flex gap-1 items-center text-primary">
        <Clock className="h-6 w-6" />
        <Muted className={className}>
          {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
        </Muted>
      </div>

      <div className="flex gap-1 items-center text-primary">
        <BookOpen className="inline h-6 w-6 text-primary" />
        <Muted className={className}> {totalLessons} lessons</Muted>
      </div>

      <div className="flex gap-1 items-center justify-start text-primary">
        <Calendar className="h-6 w-6" />
        <Muted className={className}>{date}</Muted>
      </div>

      <div className="flex gap-1 items-center justify-start">
        <ChartNoAxesColumnIncreasing
          className={`h-6 w-6 ${getLevelColor(courseLevel)}`}
        />
        <P className={`${getLevelColor(courseLevel)} text-sm ${className}`}>
          {courseLevel}
        </P>
      </div>
    </div>
  );
};