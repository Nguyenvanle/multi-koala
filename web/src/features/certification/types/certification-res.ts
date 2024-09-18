import { CertificationBodySchema } from "@/features/certification/schemas/certification";
import {
  CertificationDetailResponseSchema,
  CertificationsResponseSchema,
} from "@/features/certification/schemas/certification-res";
import { z } from "zod";

export type CertificationsResponse = z.infer<
  typeof CertificationsResponseSchema
>;
export type TeacherDetailResponse = z.infer<
  typeof CertificationDetailResponseSchema
>;

export type CertificationsResult = z.infer<typeof CertificationBodySchema>[];
export type CertificationDetailResult = z.infer<typeof CertificationBodySchema>;
