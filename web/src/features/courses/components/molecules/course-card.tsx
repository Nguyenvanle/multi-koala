// features/courses/components/CourseCard.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";
import CourseBadges from "@/features/courses/components/molecules/course-badge";
import CourseImage from "@/features/courses/components/molecules/course-image";
import { getLevelColor } from "@/features/courses/libs/level";
import useLessons from "@/features/lessons/hooks/useLessons";
import { convertDuration } from "@/lib/utils";
import { CourseCardProps } from "@/types/course/course";

export const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  courseName,
  coursePrice,
  courseImage,
  courseType,
  courseRating,
  courseLevel,
}) => {
  const { duration, lessons } = useLessons({ params: { courseId } });
  const discount = 0.2;
  const discountedPrice = coursePrice - coursePrice * discount;
  const { hours, minutes, seconds } = convertDuration(duration || 0);

  return (
    <Card className="flex flex-col justify-between gap-0 w-full max-w-sm min-w-60 marker:min-h-96 h-full rounded overflow-hidden hover:shadow-md hover:shadow-accent">
      <CardHeader className="p-0 space-y-0 relative">
        <CourseImage src={courseImage} alt={courseName} />
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-4 justify-between gap-4 relative shadow-inner">
        <CardTitle className="line-clamp-2 text-2xl" title={courseName}>
          {courseName}
        </CardTitle>

        <CourseBadges courseType={courseType} />

        <div className="flex flex-row flex-wrap justify-between gap-1">
          <Muted>
            {hours > 0 ? `${hours}h ${minutes}m ${seconds}'` : `${minutes}m ${seconds}'`} • {lessons?.length ?? 0} lessons
          </Muted>
          <Muted className={`font-medium ${getLevelColor(courseLevel)}`}>
            {courseLevel}
          </Muted>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row gap-2 justify-between px-4 pb-4">
        <Button className="px-2">⭐{courseRating * 5}</Button>
        <Button variant={"outline"} className="flex-1 space-x-1">
          <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>
        </Button>
      </CardFooter>
    </Card>
  );
};