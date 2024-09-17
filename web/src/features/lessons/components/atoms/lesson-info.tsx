// LessonInfo.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonBody } from "@/features/lessons/schema/lessons";

export const LessonInfo: React.FC<{ lesson: LessonBody }> = ({ lesson }) => {
  // Tính toán giờ, phút và giây
  const totalSeconds = lesson.video.videoDuration;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.lessonName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{lesson.lessonDescription}</p>
        <div className="mt-4">
          <Badge variant="secondary">
            Duration: {minutes} minutes {seconds} seconds
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
