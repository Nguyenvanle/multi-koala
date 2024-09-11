"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Muted, P } from "@/components/ui/typography";
import { getLevelColor } from "@/features/courses/libs/level";
import useLessons from "@/features/lessons/hooks/useLessons";
import { convertDuration } from "@/lib/utils";
import { CourseCardProps } from "@/types/course/course";
import Image from "next/image";

export function CourseCard({
  courseId,
  courseName,
  coursePrice,
  courseImage,
  courseType,
  courseRating,
  courseLevel,
}: CourseCardProps) {
  const { duration, lessons } = useLessons({ params: { courseId } });
  const discount: number = 0.2;
  const discountedPrice: number = coursePrice - coursePrice * discount;

  // Kiểm tra totalDuration, nếu null thì sử dụng 0
  const { hours, minutes, seconds } = convertDuration(duration || 0);

  const displayedTypes = courseType.slice(0, 2); // Lấy tối đa 2 loại khóa học
  const additionalTypesCount =
    courseType.length > 2 ? courseType.length - 2 : 0; // Tính số loại còn lại

  return (
    <Card className="flex flex-col justify-between gap-0 w-full max-w-sm  min-w-60 marker:min-h-96 h-full rounded overflow-hidden hover:shadow-md hover:shadow-accent">
      <CardHeader className="p-0 space-y-0 relative">
        <div className="relative w-full h-48 overflow-hidden ">
          <Image
            src={courseImage}
            alt={courseName}
            fill
            className="object-cover object-center hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 p-4 justify-between gap-4 relative shadow-inner">
        <CardTitle className="line-clamp-2 text-2xl" title={courseName}>
          {courseName}
        </CardTitle>

        <div className="flex flex-row flex-wrap gap-1">
          {displayedTypes.map((type) => (
            <Badge
              key={type.typeName}
              className="bg-secondary text-secondary-foreground rounded px-1"
            >
              #{type.typeName}
            </Badge> // Hiển thị từng badge cho mỗi loại khóa học
          ))}
          {additionalTypesCount > 0 && (
            <Badge className="bg-secondary text-secondary-foreground rounded px-1">
              +{additionalTypesCount}
            </Badge> // Hiển thị số loại còn lại nếu có
          )}
        </div>

        <div className="flex flex-row flex-wrap justify-between gap-1">
          <Muted>
            {hours > 0
              ? `${hours}h ${minutes}m ${seconds}'`
              : `${minutes}m ${seconds}'`}{" "}
            • {lessons?.length ?? 0} lessons
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
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
