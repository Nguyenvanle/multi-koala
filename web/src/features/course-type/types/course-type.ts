import { z } from "zod";

// Định nghĩa schema cho một trường (type)
export const CourseTypeBodyType = z.object({
  typeName: z.string(),
  typeDescription: z.string(),
});

// Định nghĩa schema cho phản hồi của danh sách các trường
export const CourseTypeResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: z.array(CourseTypeBodyType), // Mảng các loại khóa học
});

// Định nghĩa schema cho phản hồi chi tiết của một trường
export const CourseTypeDetailResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: CourseTypeBodyType, // Chi tiết của một loại khóa học
});

// Xuất các loại cho phản hồi

// Mảng các loại khóa học
export type CourseTypeResType = z.infer<typeof CourseTypeResponseBodyType>;

export const CourseTypesResultBodyType = z.array(CourseTypeBodyType);

export type CourseTypesResultResType = z.infer<
  typeof CourseTypesResultBodyType
>;

// Chi tiết của một loại khóa học
export type CourseTypeDetailResType = z.infer<
  typeof CourseTypeDetailResponseBodyType
>;

// Xuất loại đã suy diễn cho một loại khóa học
export type CourseType = z.infer<typeof CourseTypeBodyType>;
