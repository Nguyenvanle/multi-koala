import { CertificationBodySchema } from "@/features/certification/schemas/certification";
import { BaseResponseSchema } from "@/schemas/base-res";
import { z } from "zod";

export const CertificationsResponseSchema = BaseResponseSchema.extend({
  result: z.array(CertificationBodySchema),
});

export const CertificationDetailResponseSchema = BaseResponseSchema.extend({
  result: CertificationBodySchema,
});
