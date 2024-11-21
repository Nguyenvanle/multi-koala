import { Skeleton } from "@/components/ui/skeleton";
import { LessonsCard } from "@/features/courses/components/layout/lesson-card";
import { LessonInfo } from "@/features/lessons/components/atoms/lesson-info";
import { VideoPlayer } from "@/features/lessons/components/atoms/video-player";
import { QuizSection } from "@/features/lessons/components/molecules/quiz-section";
import useLessons from "@/features/lessons/hooks/useLessons";
import { useVisibleLessons } from "@/features/lessons/hooks/useVisibleLesson";
import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { useParams } from "next/navigation";

interface LessonDetailPageProps {
  lesson: LessonDetailResult;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  lesson,
}) => {
  const { courseId } = useParams();

  const { lessons, loading, error, mutate } = useLessons(courseId as string);

  // Kiểm tra nếu lessons không phải là null trước khi truyền vào useVisibleLessons
  const { visibleLessons, loadMoreLessons } = useVisibleLessons(lessons || []);

  if (loading) {
    return <Skeleton className="w-[100vw] h-[100vw]" />;
  }

  if (error) {
    return <div>Error loading lessons: {error}</div>;
  }

  return (
    <div className="flex flex-1 items-center justify-center w-full">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6 w-full">
        <div className="xl:col-span-2 aspect-video w-full min-h-[50vh] border rounded">
          {!lesson.video && (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-muted-foreground text-xl font-bold">
                Video Not Found
              </h2>
            </div>
          )}
          {lesson.video && <VideoPlayer videoUrl={lesson.video.videoUrl} />}
        </div>

        <LessonsCard
          visibleLessons={visibleLessons}
          onLoadMore={loadMoreLessons}
          lessons={lessons}
          mutateCourses={mutate}
        />

        <div className="flex gap-6 flex-col xl:col-span-3">
          <LessonInfo lesson={lesson} />

          <QuizSection />
        </div>
      </div>
    </div>
  );
};
