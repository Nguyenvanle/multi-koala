import { z } from "zod";

export const ImageBodyType = z.object({
  imageId: z.string().uuid(),
  imageUrl: z.string(),
});

export type ImageResType = z.infer<typeof ImageBodyType>;
