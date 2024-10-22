import { CourseBodyType } from "@/features/courses/types/course";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const TeacherMyCourseBody = CourseBodyType.extend({
  totalEnrollments: z.number(),
  totalCompleted: z.number(),
  income: z.number(),
});

export type TeacherMyCourseBodyType = z.infer<typeof TeacherMyCourseBody>;

export const TeacherMyCoursesBody = z.array(
  CourseBodyType.extend({
    totalEnrollments: z.number(),
    totalCompleted: z.number(),
    income: z.number(),
  })
);
export const TeacherMyCoursesRes = BaseResponseSchema.extend({
  result: TeacherMyCoursesBody,
});

export type TeacherMyCoursesBodyType = z.infer<typeof TeacherMyCoursesBody>;
export type TeacherMyCoursesResType = z.infer<typeof TeacherMyCoursesRes>;
