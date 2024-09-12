import { z } from "zod";

export const CourseFieldBodyType = z.object({
  fieldName: z.string(),
  fieldDescription: z.string(),
});

export type CourseFieldResType = z.infer<typeof CourseFieldBodyType>;
