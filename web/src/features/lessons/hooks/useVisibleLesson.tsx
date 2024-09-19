import { LessonsResult } from "@/features/lessons/types/lessons-res";
import { useState, useCallback } from "react";

export const useVisibleLessons = (initialLessons: LessonsResult) => {
  const [visibleLessons, setVisibleLessons] = useState<number>(10);

  const loadMoreLessons = useCallback(() => {
    if (!initialLessons) return;
    setVisibleLessons((prev) => Math.min(prev + 10, initialLessons.length));
    console.log("flag");
  }, [initialLessons]);

  return {
    visibleLessons,
    loadMoreLessons,
  };
};
