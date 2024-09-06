import { ImageBodyType } from "@/features/images/types/image";
import { RoleBodyType } from "@/features/roles/types/role";
import { z } from "zod";

export const UserBodyType = z.object({
  userId: z.string().uuid(),
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  userBirth: z.string().transform((date) => new Date(date)),
  userBio: z.string(),
  userHometown: z.string(),
  email: z.string().email(),
  image: ImageBodyType,
  roles: z.array(RoleBodyType),
  deleted: z.boolean(),
});

export type UserResType = z.infer<typeof UserBodyType>;
