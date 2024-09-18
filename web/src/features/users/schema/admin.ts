import { z } from "zod";
import { UserBodyType } from "@/features/users/schema/user";

// Định nghĩa schema cho Admin
export const AdminBodySchema = UserBodyType.extend({
  createByAdmin: z.string().nullable(),
  firstLogin: z.boolean(),
  deleted: z.boolean(),
});

export type AdminBodyType = z.infer<typeof AdminBodySchema>;
