import { lessonService } from "@/features/lessons/services/lesson";
import {
  LessonResponse,
  LessonsResult,
} from "@/features/lessons/types/lessons-res";
import { useEffect, useState, useMemo } from "react";

interface UseLessonsProps {
  params?: { courseId?: string };
}

export default function useLessons({ params }: UseLessonsProps) {
  const [lessons, setLessons] = useState<LessonsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Mặc định là true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setError(null);
      try {
        const response = params?.courseId
          ? await lessonService.getAllByCourseId(params.courseId)
          : await lessonService.getAll();

        if (response && Array.isArray(response.result)) {
          setLessons(response.result);
        } else {
          throw new Error(
            "Invalid response format or lessons data is not an array"
          );
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setLessons(null);
      } finally {
        setLoading(false); // Đặt loading thành false khi hoàn thành
      }
    };

    fetchLessons();
  }, [params?.courseId]);

  const duration = useMemo(() => {
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return null;
    }
    return lessons.reduce((total, lesson) => {
      return total + (lesson.video?.videoDuration || 0);
    }, 0);
  }, [lessons]);

  return { lessons, loading, error, duration };
}