import { z } from "zod";

export const COURSE_VERIFY = z.enum([
  "PENDING_APPROVED",
  "APPROVED",
  "REJECTED",
  " IN_EDITING",
]);
