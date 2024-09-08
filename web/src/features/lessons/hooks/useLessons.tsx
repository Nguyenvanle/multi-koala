import { lessonService } from "@/features/lessons/services/lesson";
import { LessonsResultResType } from "@/features/lessons/types/lesson";
import { useEffect, useState } from "react";

export default function useLessons() {
  const [lessons, setLessons] = useState<LessonsResultResType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const { result } = await lessonService.getAll();
        setLessons(result?.result as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return { lessons, loading, error };
}
