import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

// Define schema for student status object
const StudentStatusBody = z.object({
  status: z.enum([
    "new",
    "active",
    "completed_lesson",
    "completed_course",
    "inactive",
  ]),
  numberOfStudents: z.number(),
  description: z.string(),
});

// Define schema for the main result object
const StudentChartBody = z.object({
  month: z.string(),
  trend: z.number(),
  studentStatus: z.array(StudentStatusBody),
});

// Define the complete response schema
const StudentChartRes = BaseResponseSchema.extend({
  result: StudentChartBody,
});

// Export types
export type StudentStatusType = z.infer<typeof StudentStatusBody>;
export type StudentChartBodyType = z.infer<typeof StudentChartBody>;
export type StudentChartResType = z.infer<typeof StudentChartRes>;
