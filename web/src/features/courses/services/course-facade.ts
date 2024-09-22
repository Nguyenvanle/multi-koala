import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { CourseRepository } from "@/features/courses/services/course-repository";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import { CoursesResultResType } from "@/features/courses/types/course";
import { FilterFactory } from "@/features/filter/services/factory";

export class CourseFacade {
  // sử dụng course repo để gọi api fetch
  constructor(private repository: CourseRepository) {}

  // Method xử lý kết quả đầu ra
  async getProcessedCourses(
    sortOrder: SortOption,
    filters: any
  ): Promise<CoursesResultResType> {
    const courses = await this.repository.getCourses();

    const filteredCourses = this.applyFilters(courses, filters);

    return this.sortCourses(filteredCourses, sortOrder);
  }

  // Method filter được gọi lại ở trên
  private applyFilters(
    courses: CoursesResultResType,
    filters: any
  ): CoursesResultResType {
    return Object.entries(filters).reduce(
      (filteredCourses, [filterType, filterValue]) => {
        if (
          filterValue === undefined ||
          (filterType === "rating" && filterValue === 0)
        ) {
          return filteredCourses;
        }

        const filterStrategy = FilterFactory.createFilter(filterType);

        return filterStrategy.apply(filteredCourses, filterValue);
      },
      courses
    );
  }

  // Method sort được gọi lại ở trên
  private sortCourses(
    courses: CoursesResultResType,
    order: SortOption
  ): CoursesResultResType {
    return [...courses].sort((a, b) => {
      const aDiscountedPrice = DiscountAdapter.getDiscountedPrice(a);
      const bDiscountedPrice = DiscountAdapter.getDiscountedPrice(b);

      const aRating = RatingAdapter.getRating(a.courseId);
      const bRating = RatingAdapter.getRating(b.courseId);

      switch (order) {
        case "courseName_asc":
          return a.courseName.localeCompare(b.courseName);

        case "courseName_desc":
          return b.courseName.localeCompare(a.courseName);

        case "price_asc":
          return aDiscountedPrice - bDiscountedPrice;

        case "price_desc":
          return bDiscountedPrice - aDiscountedPrice;

        case "rating_desc":
          return bRating - aRating;

        case "uploadedAt_desc":
          return (
            new Date(b.courseUploadedAt).getTime() -
            new Date(a.courseUploadedAt).getTime()
          );

        default:
          return 0;
      }
    });
  }
}
