// src/features/lessons/types/responseSchema.ts
import { LessonBodySchema } from "@/features/lessons/schema/lessons";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const LessonResponseSchema = BaseResponseSchema.extend({
  result: z.array(LessonBodySchema),
});

export const LessonDetailResponseSchema = BaseResponseSchema.extend({
  result: LessonBodySchema,
});
