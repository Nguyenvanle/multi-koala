import { courseService } from "@/features/courses/services/courses";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import { CoursesResultResType } from "@/features/courses/types/course";

export class CourseRepository {
  // Create course var to store result
  private courses: CoursesResultResType | null = null;

  // Method to get Course Result (fetch)
  async getCourses(): Promise<CoursesResultResType> {
    if (this.courses) {
      return this.courses;
    }

    const { result } = await courseService.getAll();

    if (result?.result) {
      this.courses = result.result;

      await Promise.all([
        DiscountAdapter.fetchDiscounts(this.courses),

        RatingAdapter.fetchRatings(this.courses),
      ]);
    }

    return this.courses || [];
  }
}
