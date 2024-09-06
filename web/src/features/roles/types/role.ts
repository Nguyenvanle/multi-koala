import { z } from "zod";

export const RoleBodyType = z.object({
  roleName: z.string(),
  roleDescription: z.string(),
  permission: z.array(z.string()),
});

export type RoleResType = z.infer<typeof RoleBodyType>;
