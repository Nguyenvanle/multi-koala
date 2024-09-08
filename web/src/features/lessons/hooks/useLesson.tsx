import { lessonService } from "@/features/lessons/services/lesson";

import { LessonDetailResult } from "@/features/lessons/types/lessons-res";
import { useEffect, useState } from "react";

export default function useLesson({
  params,
}: {
  params: { courseId: string };
}) {
  const [lesson, setLesson] = useState<LessonDetailResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const { result } = await lessonService.getDetail(params.courseId);
        setLesson(result?.result as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [params.courseId]);

  return { lesson, loading, error };
}
