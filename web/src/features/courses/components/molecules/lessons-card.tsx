import { CourseCardProps } from "@/types/course/course";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import LessonCard from "@/features/courses/components/molecules/lesson-card";

export default function LessonsCard({ lessons }: CourseCardProps) {
  const LESSONS = lessons;

  return (
    <Card className="flex flex-1 flex-col w-full rounded overflow-hidden hover:shadow-md">
      <CardHeader className="flex flex-0 pb-0">
        <CardTitle>Lessons</CardTitle>
      </CardHeader>

      <CardFooter className="flex flex-1 flex-col">
        <ScrollArea className="min-h-[260px] h-[50vh] h- w-full items-start space-y-4">
          {LESSONS.map((lesson) => (
            <LessonCard key={lesson.lessonId} {...lesson} />
          ))}
        </ScrollArea>
      </CardFooter>
    </Card>
  );
}
