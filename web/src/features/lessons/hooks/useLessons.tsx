import { lessonService } from "@/features/lessons/services/lesson";
import {
  LessonResponse,
  LessonsResult,
} from "@/features/lessons/types/lessons-res";
import { useMemo } from "react";
import useSWR from "swr";

// Key cho SWR cache
const getLessonsKey = (courseId?: string) =>
  courseId ? `lessons/${courseId}` : "lessons";

// Fetcher function cho SWR
const lessonsFetcher = async (key: string) => {
  const courseId = key.startsWith("lessons/") ? key.split("/")[1] : undefined;
  const { result } = courseId
    ? await lessonService.getAllByCourseId(courseId)
    : await lessonService.getAll();

  if (!result?.result) {
    return null;
  }

  // Lọc lessons không bị xóa
  return (result.result as any[]).filter((lesson) => !lesson.deleted);
};

export default function useLessons(courseId?: string) {
  const {
    data: lessons,
    error,
    isLoading,
    mutate,
  } = useSWR<LessonsResult | null>(getLessonsKey(courseId), lessonsFetcher, {
    revalidateOnFocus: false, // Không tự động revalidate khi focus lại tab
    revalidateOnReconnect: true, // Tự động revalidate khi có kết nối internet trở lại
  });

  // Sắp xếp lessons theo thời gian upload
  const sortedLessons = useMemo(() => {
    if (!lessons) return null;

    return [...lessons].sort((a, b) => {
      return (
        new Date(a.lessonUploadedAt).getTime() -
        new Date(b.lessonUploadedAt).getTime()
      );
    });
  }, [lessons]);

  // Tính tổng thời lượng của các bài học
  const duration = useMemo(() => {
    if (!sortedLessons) return null;

    return sortedLessons.reduce((total, lesson) => {
      return total + (lesson.video?.videoDuration ?? 0);
    }, 0);
  }, [sortedLessons]);

  return {
    lessons: sortedLessons,
    loading: isLoading,
    error: error?.message,
    duration,
    mutate,
  };
}
