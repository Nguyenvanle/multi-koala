import { lessonService } from "@/features/lessons/services/lesson";
import {
  LessonResponse,
  LessonsResult,
} from "@/features/lessons/types/lessons-res";
import { useEffect, useState } from "react";

interface UseLessonsProps {
  params?: { courseId?: string };
}

export default function useLessons({ params }: UseLessonsProps) {
  const [lessons, setLessons] = useState<LessonsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const { result } = params?.courseId
          ? await lessonService.getAllByCourseId(params.courseId)
          : await lessonService.getAll();

        // Kiểm tra nếu res.result tồn tại
        if (result) {
          setLessons(result.result as any);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();

    const totalDuration = lessons?.reduce((total, lesson) => {
      return total + (lesson.video.videoDuration || 0); // Cộng dồn videoDuration, đảm bảo nó có giá trị
    }, 0);

    if (totalDuration) setDuration(totalDuration);
  }, [lessons, params]); // Thêm params vào dependency array

  return { lessons, loading, error, duration };
}