// Cập nhật mã TypeScript để đảm bảo rằng bạn có thể gọi useLessons mà không cần truyền tham số
import { lessonService } from "@/features/lessons/services/lesson";
import {
  LessonResponse,
  LessonsResult,
} from "@/features/lessons/types/lessons-res";
import { useEffect, useMemo, useState } from "react";

export default function useLessons(courseId: string) {
  const [lessons, setLessons] = useState<LessonsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Nếu không có courseId thì gọi API lấy toàn bộ bài học
        const { result } = courseId
          ? await lessonService.getAllByCourseId(courseId)
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
  }, [courseId]); // Chỉ phụ thuộc vào params

  const sortedLessons = useMemo(() => {
    if (!lessons) return null;

    return [...lessons].sort((a, b) => {
      // Assuming there's an uploadDate field. Adjust the field name if it's different
      return (
        new Date(a.lessonUploadedAt).getTime() -
        new Date(b.lessonUploadedAt).getTime()
      );
    });
  }, [lessons]);

  useEffect(() => {
    if (sortedLessons) {
      const totalDuration = sortedLessons.reduce((total, lesson) => {
        return total + (lesson.video?.videoDuration ?? 0);
      }, 0);

      setDuration(totalDuration);
    }
  }, [sortedLessons]);

  return { lessons: sortedLessons, loading, error, duration };
}
