import { CourseTypeBodyType } from "@/features/courses/types/course-type";
import { ImageBodyType } from "@/features/images/types/image";
import { UserBodyType } from "@/features/users/types/user";
import { COURSE_VERIFY } from "@/types/course/verify";
import { z } from "zod";

// Định nghĩa schema cho khóa học
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

// Định nghĩa schema cho phản hồi

// Mảng khóa học
export const CourseResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: z.array(CourseBodyType), // Một mảng khóa học
});

// Chi tiết khóa học
export const CourseDetailResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: CourseBodyType, // Chi tiết khóa học
});

// Xuất kiểu dữ liệu cho phản hồi

// Mảng khóa học
export type CourseResType = z.infer<typeof CourseResponseBodyType>;

export const CoursesResultBodyType = z.array(CourseBodyType);

export type CoursesResultResType = z.infer<typeof CoursesResultBodyType>;

// Chi tiết khóa học
export type CourseDetailResType = z.infer<typeof CourseDetailResponseBodyType>;

