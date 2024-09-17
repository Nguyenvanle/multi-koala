// Cập nhật mã TypeScript để đảm bảo rằng bạn có thể gọi useLessons mà không cần truyền tham số
import { lessonService } from "@/features/lessons/services/lesson";
import {
  LessonResponse,
  LessonsResult,
} from "@/features/lessons/types/lessons-res";
import { useEffect, useState } from "react";

interface UseLessonsProps {
  params?: { courseId?: string };
}

export default function useLessons(params?: UseLessonsProps) {
  const [lessons, setLessons] = useState<LessonsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Nếu không có courseId thì gọi API lấy toàn bộ bài học
        const { result } = params?.params?.courseId
          ? await lessonService.getAllByCourseId(params.params.courseId)
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
  }, [params]); // Chỉ phụ thuộc vào params

  // Tính toán tổng duration khi lessons được cập nhật
  useEffect(() => {
    if (lessons) {
      const totalDuration = lessons.reduce((total, lesson) => {
        return total + (lesson.video.videoDuration || 0); // Cộng dồn videoDuration, đảm bảo nó có giá trị
      }, 0);

      setDuration(totalDuration);
    }
  }, [lessons]); // Phụ thuộc vào lessons để cập nhật duration

  return { lessons, loading, error, duration };
}
