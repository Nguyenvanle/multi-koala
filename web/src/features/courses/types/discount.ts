import { AdminBodySchema, AdminBodyType } from "@/features/users/schema/admin";
import { COURSE_VERIFY } from "@/types/course/verify";
import { z } from "zod";

// Định nghĩa schema cho Discount
const DiscountBodyType = z.object({
  discountId: z.string().uuid(),
  discountRate: z.number(),
  startDate: z.string().transform((date) => new Date(date)),
  endDate: z.string().transform((date) => new Date(date)),
  createdByAdmin: AdminBodySchema,
});

// Định nghĩa schema cho DiscountCourse
const DiscountCourseBodyType = z.object({
  discount: DiscountBodyType,
  status: COURSE_VERIFY,
  discountCourseId: z.string().uuid(),
});

// Định nghĩa schema cho phản hồi
export const DiscountResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: z.array(DiscountCourseBodyType),
});

// Xuất kiểu dữ liệu cho phản hồi
export type DiscountResType = z.infer<typeof DiscountResponseBodyType>;

export const DiscountsResultBodyType = z.array(DiscountCourseBodyType);

export type DiscountsResultResType = z.infer<typeof DiscountsResultBodyType>;
