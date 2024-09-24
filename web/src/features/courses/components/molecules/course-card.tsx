// features/courses/components/CourseCard.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Muted, P, Small } from "@/components/ui/typography";
import CourseBadges from "@/features/courses/components/molecules/course-badge";
import CourseFields from "@/features/courses/components/molecules/course-field";
import CourseImage from "@/features/courses/components/molecules/course-image";
import { getLevelColor } from "@/features/courses/libs/level";
import useLessons from "@/features/lessons/hooks/useLessons";
import { convertDuration } from "@/lib/utils";
import { CourseCardProps } from "@/types/course/course";
import { ListVideo } from "lucide-react";

export const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  courseName,
  coursePrice,
  courseImage,
  courseType,
  courseRating,
  courseLevel,
  courseFields,
  courseDiscount,
  courseCreateAt,
}) => {
  const { duration, lessons } = useLessons({ params: { courseId } });
  
  const discount = courseDiscount;
  const discountedPrice = courseDiscount;

  const { hours, minutes } = convertDuration(duration || 0);
  const formattedDate = new Date(courseCreateAt).toLocaleDateString();

  const rating = (Math.round(courseRating * 5 * 10) / 10).toFixed(1);

  return (
    <Card className="flex flex-col justify-between gap-0 w-full md:max-w-sm min-w-60 marker:min-h-96 h-full rounded overflow-hidden ">
      <CardHeader className="p-0 space-y-0 relative">
        <CourseImage src={courseImage} alt={courseName} />

        <div className="flex w-full justify-end flex-row absolute top-0 left-0 p-4">
          <CourseFields courseField={courseFields} />
        </div>

        <div className="flex w-full justify-between flex-row absolute bottom-0 left-0 p-4">
          <div className="px-2 bg-gray-700 rounded">
            <Small className="font-medium text-white">{`⭐ ${rating}`}</Small>
          </div>

          <div className="flex flex-row items-center pt-[1px] px-2 gap-1 bg-gray-700 rounded">
            <ListVideo className="w-4 h-4 text-white mb-[1px]" />

            <Small className="text-white">{`${
              lessons?.length ?? 0
            } lesson`}</Small>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-4 justify-between gap-4 relative shadow-inner">
        <CardTitle className="line-clamp-2 text-2xl" title={courseName}>
          {courseName}
        </CardTitle>

        <CourseBadges courseType={courseType} />

        <div className="flex flex-row flex-wrap justify-between gap-1">
          <Muted>{hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}</Muted>
          <Muted className={`font-medium ${getLevelColor(courseLevel)}`}>
            {courseLevel}
          </Muted>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col px-4 gap-2 pb-4">
        <Button className="flex-1 flex-grow self-stretch space-x-1">
          <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          {discount !== coursePrice ? (
            <span className="line-through text-foreground">{`/${coursePrice.toFixed(
              2
            )}`}</span>
          ) : (
            <></>
          )}
        </Button>

        <Muted className="flex text-right self-stretch items-end">
          {formattedDate}
        </Muted>
      </CardFooter>
    </Card>
  );
};