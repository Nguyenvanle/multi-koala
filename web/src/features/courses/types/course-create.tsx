import { z } from "zod";

export const CourseCreatePayload = z.object({
  courseName: z.string().min(1, "Course name is required"),
  coursePrice: z.number().min(0, "Price must be a positive number"),
  courseLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], {
    required_error: "Course level is required",
  }),
  courseDescription: z.string().min(1, "Course description is required"),
  types: z.array(z.string()),
  fields: z.array(z.string()),
  imageUrl: z.string().url("Invalid URL format"),
});

export type CourseCreatePayloadType = z.infer<typeof CourseCreatePayload>;
