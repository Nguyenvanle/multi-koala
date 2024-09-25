import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { H4 } from "@/components/ui/typography";
import { LessonList } from "@/features/courses/components/organisms/lesson-list";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import Link from "next/link";

interface LessonsCardProps {
  lessons: LessonDetailResult[] | null;
  visibleLessons: number;
  onLoadMore: () => void;
}

export const LessonsCard: React.FC<LessonsCardProps> = ({
  lessons,
  visibleLessons,
  onLoadMore,
}) => {
  return (
    <Card className="flex flex-0 flex-col w-full rounded overflow-hidden  gap-2">
      <CardHeader className="flex flex-0 pb-0">
        <CardTitle>Lessons</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-0 flex-col pr-4 relative">
        {!lessons ? (
          <Skeleton className="w-[100vw] h-[100vh]"></Skeleton>
        ) : lessons.length > 0 ? (
          <LessonList
            lessons={lessons}
            visibleLessons={visibleLessons}
            onLoadMore={onLoadMore}
            freeLessonsCount={3}
          />
        ) : (
          <div className="h-[20vh] content-center">
            <H4>LESSONS NOT FOUND</H4>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
