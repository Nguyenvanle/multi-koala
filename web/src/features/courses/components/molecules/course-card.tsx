"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Muted, P } from "@/components/ui/typography";
import useLessons from "@/features/lessons/hooks/useLessons";
import { convertDuration } from "@/lib/utils";
import { CourseCardProps } from "@/types/course/course";
import Image from "next/image";

export function CourseCard({
  courseId,
  courseName,
  coursePrice,
  courseImage,
}: CourseCardProps) {
  const { duration, lessons } = useLessons({ params: { courseId } });
  const discount: number = 0.2;
  const discountedPrice: number = coursePrice - coursePrice * discount;
  // Kiểm tra totalDuration, nếu null thì sử dụng 0
  const { hours, minutes, seconds } = convertDuration(duration || 0);

  return (
    <Card className="flex flex-col justify-between gap-0 w-full max-w-sm min-h-[370px] min-w-60 rounded overflow-hidden hover:shadow-md hover:shadow-accent">
      <CardHeader className="p-0 pb-4">
        <div className="relative w-full h-48 overflow-hidden">
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

      <CardContent className="flex flex-col flex-1 px-4 pb-4 justify-between">
        <CardTitle className="line-clamp-2" title={courseName}>
          {courseName}
        </CardTitle>

        <Muted>
          {hours > 0
            ? `${hours}h ${minutes}m ${seconds}'`
            : `${minutes}m ${seconds}'`}{" "}
          • {lessons?.length ?? 0} lessons
        </Muted>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4">
        <Button className="flex-1 space-x-1">
          <span className="font-bold">{`$${discountedPrice.toFixed(2)}`}</span>
          <Muted className="line-through">{`/${coursePrice.toFixed(2)}`}</Muted>{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
