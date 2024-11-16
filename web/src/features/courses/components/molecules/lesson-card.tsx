import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { H4, P, Small } from "@/components/ui/typography";
import { CirclePlay, Lock, Settings } from "lucide-react";
import { LessonBody } from "@/features/lessons/schema/lessons";
import { convertDuration } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface LessonCardProps extends LessonBody {
  isLocked: boolean;
  lessonNumber: number; // Add this line
  isPublic?: boolean;
}

export default function LessonCard({
  lessonId,
  lessonName,
  image,
  video,
  isLocked,
  lessonNumber,
  isPublic,
}: LessonCardProps) {
  const path = usePathname();
  const { courseId } = useParams();
  const [imageLoading, setImageLoading] = useState(true);

  const { hours, minutes, seconds } = convertDuration(
    video?.videoDuration ?? 0
  );
  const isSelectedLesson = path === `/courses/${courseId}/${lessonId}`;

  const cardContent = (
    <Card
      className={`flex flex-row w-full rounded-sm overflow-hidden shadow-none mb-2 hover:shadow-md ${
        isSelectedLesson && !isLocked ? "bg-accent" : ""
      } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <CardContent className="p-0 relative">
        {imageLoading && (
          <Skeleton className="h-20 w-20 rounded-none absolute top-0 left-0 z-10" />
        )}

        <Image
          src={image?.imageUrl ?? "/images/fallback-image.jpg"}
          alt={lessonId}
          width={80}
          height={80}
          quality={100}
          priority
          onLoad={() => setImageLoading(false)}
          className={`h-20 w-20 object-cover ${
            imageLoading ? "invisible" : "visible"
          }`}
        />
      </CardContent>

      <CardHeader className="flex flex-1 flex-row gap-4 items-center px-2 py-0 content-between pr-4">
        <div className="flex flex-1 flex-col">
          <P className="line-clamp-2">{lessonName}</P>
          <Small>
            {hours > 0
              ? `${hours}h ${minutes}m ${seconds}s`
              : minutes > 0
                ? `${minutes}m ${seconds}s`
                : ` ${seconds.toFixed(0)}s`}
          </Small>
        </div>

        {isLocked ? (
          <Lock className="text-gray-400" size={24} />
        ) : isPublic ? (
          <CirclePlay className="text-primary" size={24} />
        ) : (
          <Settings size={24} />
        )}
      </CardHeader>
    </Card>
  );

  if (isLocked) {
    return (
      <div
        className="flex flex-1 flex-row items-center"
        title="Enroll in this course to unlock additional lessons and advanced content!"
      >
        <div className="flex min-w-6">
          <Small className="mr-2 text-muted-foreground font-bold ">
            {lessonNumber}
          </Small>
        </div>
        {cardContent}
      </div>
    );
  }

  if (!isPublic) {
    return (
      <Link
        href={`/dashboard/courses/${courseId}/lessons/${lessonId}`}
        className="block"
      >
        <div className="flex flex-1 flex-row items-center">
          <div className="flex min-w-6">
            <Small className="mr-2 text-muted-foreground font-bold">
              {lessonNumber}
            </Small>
          </div>
          {cardContent}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${courseId}/${lessonId}`} className="block">
      <div className="flex flex-1 flex-row items-center">
        <div className="flex min-w-6">
          <Small className="mr-2 text-muted-foreground font-bold">
            {lessonNumber}
          </Small>
        </div>
        {cardContent}
      </div>
    </Link>
  );
}
