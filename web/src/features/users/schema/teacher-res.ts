// src/features/lessons/types/responseSchema.ts

import { TeacherBodySchema } from "@/features/users/schema/teacher";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const TeachersResponseSchema = BaseResponseSchema.extend({
  result: z.array(TeacherBodySchema),
});

export const TeacherDetailResponseSchema = BaseResponseSchema.extend({
  result: TeacherBodySchema,
});
