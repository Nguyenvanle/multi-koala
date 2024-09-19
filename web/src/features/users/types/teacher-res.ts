import {
  TeacherBodySchema,
  TeacherBodyType,
} from "@/features/users/schema/teacher";
import {
  TeacherDetailResponseSchema,
  TeachersResponseSchema,
} from "@/features/users/schema/teacher-res";
import { z } from "zod";

export type TeachersResponse = z.infer<typeof TeachersResponseSchema>;
export type TeacherDetailResponse = z.infer<typeof TeacherDetailResponseSchema>;

export type TeachersResult = z.infer<typeof TeacherBodySchema>[];
export type TeacherDetailResult = z.infer<typeof TeacherBodySchema>;
