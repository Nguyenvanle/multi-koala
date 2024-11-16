import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const DeleteLessonRes = BaseResponseSchema;
export type DeleteLessonResType = z.infer<typeof DeleteLessonRes>;
