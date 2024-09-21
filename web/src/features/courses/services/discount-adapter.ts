import {
  CourseDetailResultResType,
  CoursesResultResType,
} from "@/features/courses/types/course";
import { courseService } from "@/features/courses/services/courses";

export const DiscountAdapter = {
  appliedDiscount: new Map<string, number>(),

  async fetchDiscounts(courses: CoursesResultResType): Promise<void> {
    const discountPromises = courses.map(async (course) => {
      try {
        const { result: data } = await courseService.getDiscount(
          course.courseId
        );

        if (data && data.result.discountApplied !== undefined) {
          this.appliedDiscount.set(
            course.courseId,
            data.result.discountApplied
          );
        }
      } catch (error) {
        console.error(
          `Error fetching discount for course ${course.courseId}:`,
          error
        );
      }
    });

    await Promise.all(discountPromises);
  },

  getDiscountedPrice(course: CourseDetailResultResType): number {
    const discount = this.appliedDiscount.get(course.courseId) || 0;
    return course.coursePrice - course.coursePrice * discount;
  },
};
