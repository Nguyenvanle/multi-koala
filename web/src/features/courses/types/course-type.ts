import { z } from "zod";

export const CourseTypeBodyType = z.object({
  typeName: z.string(),
  typeDescription: z.string(),
});

export type CourseTypeResType = z.infer<typeof CourseTypeBodyType>;
