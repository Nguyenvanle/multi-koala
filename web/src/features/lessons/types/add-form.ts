import { z } from "zod";

export const formSchema = z.object({
  lessonName: z.string(),
  lessonDescription: z.string(),
  videoDuration: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price must be a positive number").max(1000)
  ),
  demo: z.boolean().optional(),
});

export type AddFormValues = z.infer<typeof formSchema>;
