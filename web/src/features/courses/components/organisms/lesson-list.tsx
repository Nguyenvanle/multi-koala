import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LessonSkeleton } from "@/features/courses/components/atoms/lesson-skeleton";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";

const LessonCard = dynamic(
  () => import("@/features/courses/components/molecules/lesson-card"),
  {
    loading: () => <LessonSkeleton />,
    ssr: false,
  }
);

interface LessonListProps {
  lessons: LessonDetailResult[];
  visibleLessons: number;
  onLoadMore: () => void;
  freeLessonsCount: number; // New prop to determine how many lessons are free
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  visibleLessons,
  onLoadMore,
  freeLessonsCount,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore]
  );

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleObserver]);

  return (
    <ScrollArea className="min-h-[200px] max-h-[260px] lg:max-h-[56vh] w-full items-start pr-4">
      {lessons.slice(0, visibleLessons).map((lesson, index) => (
        <LessonCard
          key={lesson.lessonId}
          {...lesson}
          isLocked={index >= freeLessonsCount}
          lessonNumber={index + 1}
        />
      ))}
      {visibleLessons < lessons.length && (
        <div ref={scrollRef} style={{ height: "20px" }} />
      )}
    </ScrollArea>
  );
};