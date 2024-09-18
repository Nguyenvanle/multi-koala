import { z } from "zod";
import { UserBodyType } from "@/features/users/schema/user";

// Định nghĩa schema cho Admin
export const TeacherBodyType = UserBodyType.extend({
  teacherRating: z.number(),
  firstLogin: z.boolean(),
  deleted: z.boolean(),
});

export type TeacherBodyType = z.infer<typeof TeacherBodyType>;
