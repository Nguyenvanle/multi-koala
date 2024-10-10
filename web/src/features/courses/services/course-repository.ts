import { courseService } from "@/features/courses/services/courses";
import { DiscountAdapter } from "@/features/courses/services/discount-adapter";
import { RatingAdapter } from "@/features/courses/services/rating-adapter";
import { CoursesResultResType } from "@/features/courses/types/course";

export class CourseRepository {
  // Tạo biến courses để lưu kết quả
  private courses: CoursesResultResType | null = null;

  // Phương thức lấy kết quả khóa học với tùy chọn force refresh
  async getCourses(
    forceRefresh: boolean = false
  ): Promise<CoursesResultResType> {
    // Nếu đã có courses và không cần refresh, trả về từ cache
    if (this.courses && !forceRefresh) {
      return this.courses;
    }

    // Gọi API để lấy dữ liệu mới nhất
    const { result } = await courseService.getAll();

    if (result?.result) {
      this.courses = result.result;

      // Đồng thời lấy discount và rating cho các khóa học
      await Promise.all([
        DiscountAdapter.fetchDiscounts(this.courses),
        RatingAdapter.fetchRatings(this.courses),
      ]);
    }

    // Trả về dữ liệu đã lấy hoặc mảng rỗng nếu không có
    return this.courses || [];
  }
}
