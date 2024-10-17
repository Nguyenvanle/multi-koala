import { z } from "zod";

export const COURSE_VERIFY = z.enum([
  "PENDING_APPROVAL",
  "APPROVED",
  "REJECTED",
  "IN_EDITING",
]);

export type CourseStatusType = z.infer<typeof COURSE_VERIFY>;
