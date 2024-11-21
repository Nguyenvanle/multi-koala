"use client";

import { LessonsCard } from "@/features/courses/components/layout/lesson-card";
import { useVisibleLessons } from "@/features/lessons/hooks/useVisibleLesson";
import { LessonsResult } from "@/features/lessons/types/lessons-res";

interface LessonsCardPageProps {
  lessons: LessonsResult;
  isPublic?: boolean;
  mutateCourses: () => void;
}

export const LessonsCardPage: React.FC<LessonsCardPageProps> = ({
  lessons,
  isPublic = true,
  mutateCourses,
}) => {
  const { visibleLessons, loadMoreLessons } = useVisibleLessons(lessons);

  return (
    <LessonsCard
      lessons={lessons}
      visibleLessons={visibleLessons}
      onLoadMore={loadMoreLessons}
      isPublic={isPublic}
      mutateCourses={mutateCourses}
    />
  );
};
