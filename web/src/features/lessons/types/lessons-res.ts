// src/features/lessons/types/responseTypes.ts
import { LessonBodySchema } from "@/features/lessons/schema/lessons";
import {
  LessonDetailResponseSchema,
  LessonResponseSchema,
} from "@/features/lessons/schema/lessons-res";
import { z } from "zod";

export type LessonResponse = z.infer<typeof LessonResponseSchema>;
export type LessonDetailResponse = z.infer<typeof LessonDetailResponseSchema>;

export type LessonsResult = z.infer<typeof LessonBodySchema>[];
export type LessonDetailResult = z.infer<typeof LessonBodySchema>;
