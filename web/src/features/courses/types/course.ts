import { CourseTypeBodyType } from "@/features/courses/types/course-type";
import { ImageBodyType } from "@/features/images/types/image";
import { UserBodyType } from "@/features/users/types/user";
import { COURSE_VERIFY } from "@/types/course/verify";
import { z } from "zod";

export const CourseBodyType = z.object({
  courseId: z.string().uuid(),
  courseName: z.string(),
  courseUploadedAt: z.string().transform((date) => new Date(date)),
  coursePrice: z.number(),
  courseDescription: z.string(),
  types: z.array(CourseTypeBodyType),
  image: ImageBodyType,
  uploadedByTeacher: UserBodyType,
  approvedByAdmin: UserBodyType.extend({
    createByAdmin: z.string().nullable(),
  }),
  status: COURSE_VERIFY,
  deleted: z.boolean(),
});

export type CourseResType = z.infer<typeof CourseBodyType>;
