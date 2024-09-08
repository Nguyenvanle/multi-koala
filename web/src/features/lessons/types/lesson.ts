import { z } from "zod";

// Định nghĩa schema cho bài học
export const LessonBodyType = z.object({
  lessonDescription: z.string(),
  imageUrl: z.string().url(),
  videoUrl: z.string().url(),
  videoDuration: z.number().nonnegative(), // Thời gian video không âm
});

// Định nghĩa schema cho phản hồi

// Mảng bài học
export const LessonResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: z.array(LessonBodyType), // Một mảng bài học
});

// Chi tiết bài học
export const LessonDetailResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: LessonBodyType, // Chi tiết bài học
});

// Xuất kiểu dữ liệu cho phản hồi

// Mảng bài học
export type LessonResType = z.infer<typeof LessonResponseBodyType>;

export const LessonsResultBodyType = z.array(LessonBodyType);

export type LessonsResultResType = z.infer<typeof LessonsResultBodyType>;

// Chi tiết bài học
export type LessonDetailResType = z.infer<typeof LessonDetailResponseBodyType>;
