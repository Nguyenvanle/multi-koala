import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { P, Small } from "@/components/ui/typography";
import { Lesson } from "@/types/course/lesson";
import { CirclePlay } from "lucide-react";

export default function LessonCard({
  lessonId,
  lessonTitle,
  lessonDuration, // Thời gian học (ví dụ: "10 phút" hoặc "1 giờ")
  lessonContent,
}: Lesson) {
  return (
    <Card className="flex flex-row w-full border-0 rounded-sm overflow-hidden shadow-none hover:outline-1 mb-2 pr-2">
      <CardContent className="p-0">
        <Skeleton className="h-20 w-20 rounded-none" />
      </CardContent>

      <CardHeader className="flex flex-1 flex-row gap-4 items-center px-2 py-0 content-between">
        <div className="flex flex-1 flex-col">
          <P className="line-clamp-2">{lessonTitle}</P>
          <Small>{lessonDuration} Mins</Small>
        </div>

        <CirclePlay />
      </CardHeader>
    </Card>
  );
}
