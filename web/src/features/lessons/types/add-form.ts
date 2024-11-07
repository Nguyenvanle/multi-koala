import { z } from "zod";

export const formSchema = z.object({
  lessonName: z.string(),
  lessonDescription: z.string(),
  demo: z.boolean().optional(),
});

export type AddFormValues = z.infer<typeof formSchema>;
