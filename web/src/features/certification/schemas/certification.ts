import { AdminBodySchema } from "@/features/users/schema/admin";
import { TeacherBodySchema } from "@/features/users/schema/teacher";
import { COURSE_VERIFY } from "@/types/course/verify";
import { z } from "zod";

export const CertificationBodySchema = z.object({
  certificateBodyId: z.string(),
  certificateName: z.string(),
  issueDate: z.string().transform((date) => new Date(date)),
  expiryDate: z.string().transform((date) => new Date(date)),
  issuingOrganization: z.string(),
  uploadedByTeacher: TeacherBodySchema,
  approvedByAdmin: AdminBodySchema,
  status: COURSE_VERIFY,
});

export type CertificationBodyType = z.infer<typeof CertificationBodySchema>;
