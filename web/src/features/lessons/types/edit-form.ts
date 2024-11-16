import { LessonBodySchema } from "@/features/lessons/schema/lessons";
import { formSchema } from "@/features/lessons/types/add-form";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const EditFormBody = formSchema.extend({
  imageFile: z.any().optional(),
  videoFile: z.any().optional(),
});
export type EditFormType = z.infer<typeof EditFormBody>;

export const EditFormRes = BaseResponseSchema.extend({
  result: LessonBodySchema,
});
export type EditFormResType = z.infer<typeof EditFormRes>;
