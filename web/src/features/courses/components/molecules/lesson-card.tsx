"use client";

// LessonCard.tsx
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { P, Small } from "@/components/ui/typography";
import { CirclePlay } from "lucide-react";
import { LessonBody } from "@/features/lessons/schema/lessons";
import { convertDuration } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function LessonCard({
  lessonId,
  lessonName,
  image,
  video,
}: LessonBody) {
  const path = usePathname();
  const { courseId } = useParams();
  const [imageLoading, setImageLoading] = useState(true);

  const { hours, minutes, seconds } = convertDuration(video.videoDuration);
  const isSelectedLesson = path === `/courses/${courseId}/${lessonId}`;

  return (
    <Link href={`/courses/${courseId}/${lessonId}`} className="block">
      <Card
        className={`flex flex-row w-full rounded-sm overflow-hidden shadow-none mb-2 hover:shadow-md ${
          isSelectedLesson && "bg-accent"
        }`}
      >
        <CardContent className="p-0 relative">
          {imageLoading && (
            <Skeleton className="h-20 w-20 rounded-none absolute top-0 left-0 z-10" />
          )}

          {!image.imageUrl.includes("https://img.freepik.com") ? (
            <Skeleton className="h-20 w-20 rounded-none top-0 left-0 z-10" />
          ) : (
            <Image
              src={image.imageUrl}
              alt={lessonId}
              width={80}
              height={80}
              quality={100}
              onLoad={() => setImageLoading(false)}
              className={`h-20 w-20 object-cover ${
                imageLoading ? "invisible" : "visible"
              }`}
            />
          )}
        </CardContent>

        <CardHeader className="flex flex-1 flex-row gap-4 items-center px-2 py-0 content-between pr-4">
          <div className="flex flex-1 flex-col">
            <P className="line-clamp-2">{lessonName}</P>
            <Small>
              {hours > 0
                ? `${hours}h ${minutes}m ${seconds}s`
                : minutes > 0
                ? `${minutes}m ${seconds}s`
                : ` ${seconds}s`}
            </Small>
          </div>

          <CirclePlay className="text-primary" size={24} />
        </CardHeader>
      </Card>
    </Link>
  );
}