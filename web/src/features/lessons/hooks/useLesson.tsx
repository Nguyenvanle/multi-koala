import { lessonService } from "@/features/lessons/services/lesson";

import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { useEffect, useState } from "react";

export default function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<LessonDetailResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { result } = await lessonService.getDetail(lessonId);
        setLesson(result?.result as LessonDetailResult);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  return { lesson, loading, error };
}
