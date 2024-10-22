import { CourseBodyType } from "@/features/courses/types/course";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

const MyPerformingCoursesBody = CourseBodyType.extend({
  numberOfReviews: z.number(),
  income: z.number(),
  avgcourseRating: z.number(),
});
export type MyPerformingCoursesBodyType = z.infer<
  typeof MyPerformingCoursesBody
>;

const MyPerformingCoursesRes = BaseResponseSchema.extend({
  result: z.array(MyPerformingCoursesBody),
});
export type MyPerformingCoursesResType = z.infer<typeof MyPerformingCoursesRes>;
