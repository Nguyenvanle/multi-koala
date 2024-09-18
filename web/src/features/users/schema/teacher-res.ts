// src/features/lessons/types/responseSchema.ts

import { TeacherBodyType } from "@/features/users/schema/teacher";
import { z } from "zod";

export const BaseResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const TeachersResponseSchema = BaseResponseSchema.extend({
  result: z.array(TeacherBodyType),
});

export const TeacherDetailResponseSchema = BaseResponseSchema.extend({
  result: TeacherBodyType,
});
