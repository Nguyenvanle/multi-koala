import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LessonBody } from "@/features/lessons/schema/lessons";

export const LessonInfo: React.FC<{ lesson: LessonBody }> = ({ lesson }) => (
  <Card>
    <CardHeader>
      <CardTitle>{lesson.lessonName}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{lesson.lessonDescription}</p>
      <div className="mt-4">
        <Badge variant="secondary">
          Duration: {Math.floor(lesson.video.videoDuration / 60)} minutes
        </Badge>
      </div>
    </CardContent>
  </Card>
);
