import { LessonBodySchema } from "@/features/lessons/schema/lessons";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const formSchema = z.object({
  lessonName: z.string(),
  lessonDescription: z.string(),
  demo: z.boolean().optional(),
});
export type AddFormValues = z.infer<typeof formSchema>;

export const AddFormRes = BaseResponseSchema.extend({
  result: LessonBodySchema,
});
export type AddFormResType = z.infer<typeof AddFormRes>;
