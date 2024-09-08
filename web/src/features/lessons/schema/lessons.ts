// src/features/lessons/types/lessonSchema.ts
import { CourseBodyType } from "@/features/courses/types/course";
import { ImageBodyType } from "@/features/images/types/image";
import { z } from "zod";

export const LessonBodySchema = z.object({
  lessonId: z.string(),
  lessonName: z.string(),
  lessonDescription: z.string(),
  image: ImageBodyType,
  video: z.object({
    videoId: z.string(),
    videoUrl: z.string(),
    videoDuration: z.number(),
  }),
  course: CourseBodyType,
  deleted: z.boolean(),
});

export type LessonBody = z.infer<typeof LessonBodySchema>;
