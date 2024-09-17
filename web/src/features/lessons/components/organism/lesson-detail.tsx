// Để xử lý lỗi Type 'LessonsResult | null' is not assignable to parameter of type 'LessonsResult',
// bạn cần thêm một bước kiểm tra trước khi gọi hook useVisibleLessons.

import { Skeleton } from "@/components/ui/skeleton";
import { LessonsCard } from "@/features/courses/components/layout/lesson-card";
import { LessonList } from "@/features/courses/components/organisms/lesson-list";
import { LessonInfo } from "@/features/lessons/components/atoms/lesson-info";
import { VideoPlayer } from "@/features/lessons/components/atoms/video-player";
import { QuizSection } from "@/features/lessons/components/molecules/quiz-section";
import useLessons from "@/features/lessons/hooks/useLessons";
import { useVisibleLessons } from "@/features/lessons/hooks/useVisibleLesson";
import {
  LessonDetailResult,
  LessonsResult,
} from "@/features/lessons/types/lessons-res";
import { useParams } from "next/navigation";

interface LessonDetailPageProps {
  lesson: LessonDetailResult;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  lesson,
}) => {
  const { courseId } = useParams<{ courseId?: string | string[] }>(); // Định nghĩa kiểu params

  // Chuyển đổi courseId sang chuỗi nếu nó là một mảng
  const normalizedCourseId = Array.isArray(courseId) ? courseId[0] : courseId;

  const { lessons, loading, error } = useLessons({
    params: { courseId: normalizedCourseId },
  });

  // Kiểm tra nếu lessons không phải là null trước khi truyền vào useVisibleLessons
  const { visibleLessons, loadMoreLessons } = useVisibleLessons(lessons || []);

  if (loading) {
    return <Skeleton className="w-[100vw] h-[100vw]" />;
  }

  if (error) {
    return <div>Error loading lessons: {error}</div>;
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-4">
        <div className="xl:col-span-2">
          <VideoPlayer videoUrl={lesson.video.videoUrl} />
        </div>

        <LessonsCard
          visibleLessons={visibleLessons}
          onLoadMore={loadMoreLessons}
          lessons={lessons}
        />

        <div className="flex gap-6 flex-col xl:col-span-3">
          <LessonInfo lesson={lesson} />

          <QuizSection />
        </div>
      </div>
    </div>
  );
};
