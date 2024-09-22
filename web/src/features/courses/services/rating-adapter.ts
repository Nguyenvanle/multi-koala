import { courseService } from "@/features/courses/services/courses";
import { CoursesResultResType } from "@/features/courses/types/course";

export const RatingAdapter = {
  appliedRating: new Map<string, number>(),

  async fetchRatings(courses: CoursesResultResType): Promise<void> {
    const ratingPromises = courses.map(async (course) => {
      try {
        const { result: data } = await courseService.getRating(course.courseId);

        if (data && data.result.avgcourseRating !== undefined) {
          this.appliedRating.set(course.courseId, data.result.avgcourseRating);
        }
      } catch (error) {
        console.error(
          `Error fetching rating for course ${course.courseId}:`,
          error
        );
      }
    });

    await Promise.all(ratingPromises);
  },

  getRating(courseId: string): number {
    return this.appliedRating.get(courseId) || 0;
  },
};
