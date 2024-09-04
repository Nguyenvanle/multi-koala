"use client";

// LessonCard.tsx
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { P, Small } from "@/components/ui/typography";
import { Lesson } from "@/types/course/lesson";
import { CirclePlay } from "lucide-react";

export default function LessonCard({
  lessonId,
  lessonTitle,
  lessonDuration,
  lessonsImageUrl,
}: Lesson) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="flex flex-row w-full rounded-sm overflow-hidden shadow-none mb-2 hover:shadow-md">
      <CardContent className="p-0 relative">
        {imageLoading && (
          <Skeleton className="h-20 w-20 rounded-none absolute top-0 left-0 z-10" />
        )}
        <Image
          src={lessonsImageUrl}
          alt={lessonTitle}
          width={80}
          height={80}
          onLoad={() => setImageLoading(false)}
          className={`h-20 w-20 object-cover ${
            imageLoading ? "invisible" : "visible"
          }`}
        />
      </CardContent>

      <CardHeader className="flex flex-1 flex-row gap-4 items-center px-2 py-0 content-between pr-4">
        <div className="flex flex-1 flex-col">
          <P className="line-clamp-2">{lessonTitle}</P>
          <Small>{lessonDuration} Mins</Small>
        </div>

        <CirclePlay />
      </CardHeader>
    </Card>
  );
}
