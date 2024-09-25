"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";
import { LessonDetailPage } from "@/features/lessons/components/organism/lesson-detail";
import useLesson from "@/features/lessons/hooks/useLesson";
import { useParams } from "next/navigation";

export default function LessonTemplate() {
  const { lessonId } = useParams();
  const { lesson, loading } = useLesson(lessonId as string);

  // Kiểm tra trạng thái loading
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4 w-full">
          <div className="xl:col-span-2">
            <Skeleton className="w-full aspect-video" />
          </div>
          <div className="xl:col-span-1">
            <Skeleton className="h-[500px] w-full" />
          </div>
          <div className="flex gap-6 flex-col xl:col-span-3">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Kiểm tra nếu không có khóa học
  if (!lesson) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4 w-full">
          <div className="xl:col-span-2 items-center">
            <Skeleton className="w-full aspect-video justify-center items-center content-center">
              <H1 className="text-center">NO COURSE FOUND</H1>
            </Skeleton>
          </div>
          <div className="xl:col-span-1">
            <Skeleton className="h-[500px] w-full" />
          </div>
          <div className="flex gap-6 flex-col xl:col-span-3">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return <LessonDetailPage lesson={lesson} />;
}
