"use client";

import { LessonsCard } from "@/features/courses/components/layout/lesson-card";
import { useVisibleLessons } from "@/features/lessons/hooks/useVisibleLesson";
import { LessonsResult } from "@/features/lessons/types/lessons-res";

interface LessonsCardPageProps {
  lessons: LessonsResult;
}

export const LessonsCardPage: React.FC<LessonsCardPageProps> = ({
  lessons,
}) => {
  const { visibleLessons, loadMoreLessons } = useVisibleLessons(lessons);

  return (
    <LessonsCard
      lessons={lessons}
      visibleLessons={visibleLessons}
      onLoadMore={loadMoreLessons}
    />
  );
};
