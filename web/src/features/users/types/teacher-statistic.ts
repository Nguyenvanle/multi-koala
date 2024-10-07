import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

// Define the TeacherStatistics schema
export const TeacherStatisticsBody = z.object({
  totalCourses: z.number(),
  totalApprovedCourses: z.number(),
  totalEnrollments: z.number(),
  totalStudents: z.number(),
  totalCompletedCourses: z.number(),
  totalPrices: z.number(),
  passRatingPerTest: z.number(),
  correctRatingPerQuestion: z.number(),
});

// Define the response schema for TeacherStatistics
export const TeacherStatisticsRes = BaseResponseSchema.extend({
  result: TeacherStatisticsBody,
});

// Define TypeScript types based on the schemas
export type TeacherStatisticsBodyType = z.infer<typeof TeacherStatisticsBody>;
export type TeacherStatisticsResType = z.infer<typeof TeacherStatisticsRes>;
