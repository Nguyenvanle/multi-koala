"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { LessonDetailPage } from "@/features/lessons/components/organism/lesson-detail";
import useLesson from "@/features/lessons/hooks/useLesson";

export default function LessonTemplate({
  params,
}: {
  params: {
    lessonId: string;
  };
}) {
  const { lesson, loading } = useLesson({ params });

  // Kiểm tra trạng thái loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 min-[540px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Skeleton className="flex min-w-[180px] min-h-[460px]" />
      </div>
    );
  }

  // Kiểm tra nếu không có khóa học
  if (!lesson) {
    return (
      <div className="flex items-center justify-center w-full h-[500px]">
        <p className="text-lg ">No courses found.</p>
      </div>
    );
  }

  return <LessonDetailPage lesson={lesson} />;
}
