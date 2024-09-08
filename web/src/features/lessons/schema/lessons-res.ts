// src/features/lessons/types/responseSchema.ts
import { LessonBodySchema } from "@/features/lessons/schema/lessons";
import { z } from "zod";

export const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const LessonResponseSchema = BaseResponseSchema.extend({
  result: z.array(LessonBodySchema),
});

export const LessonDetailResponseSchema = BaseResponseSchema.extend({
  result: LessonBodySchema,
});
