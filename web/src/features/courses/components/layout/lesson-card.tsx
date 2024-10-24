import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { H1, H4 } from "@/components/ui/typography";
import { CoursesListEmpty } from "@/features/courses/components/molecules";
import { LessonList } from "@/features/courses/components/organisms/lesson-list";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { BookOpen } from "lucide-react";
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
    <Card className="flex flex-0 flex-col w-full rounded overflow-hidden gap-2">
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
          />
        ) : (
          <div className="h-[20vh] content-center">
            <div className="flex flex-col items-center justify-center w-full text-center">
              <BookOpen className="h-6 w-6 text-muted-foreground mb-4" />
              <H4 className="text-muted-foreground mb-2">
                No lessons available
              </H4>
              <p className="text-muted-foreground mb-4">
                This course does not have any lessons yet. Please check back
                later or create a lesson.
              </p>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
