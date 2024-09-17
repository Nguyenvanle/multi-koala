import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="flex flex-0 flex-col w-full rounded overflow-hidden hover:shadow-xl transition-shadow duration-300 gap-2">
      <CardHeader className="flex flex-0 pb-0">
        <CardTitle>Lessons</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-0 flex-col pr-4 relative">
        {!lessons ? (
          <div>Loading...</div>
        ) : lessons.length > 0 ? (
          <LessonList
            lessons={lessons}
            visibleLessons={visibleLessons}
            onLoadMore={onLoadMore}
          />
        ) : (
          <div>No lessons found.</div>
        )}
      </CardFooter>
    </Card>
  );
};
