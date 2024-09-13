import { useEffect, useState } from "react";
import { courseService } from "@/features/courses/services/courses";
import { CoursesResultResType } from "@/features/courses/types/course";
import { SortOption } from "@/features/courses/components/molecules/select-sort";

export default function useCourses() {
  const [courses, setCourses] = useState<CoursesResultResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOption>("courseName_asc"); // Trạng thái để lưu trữ thứ tự sắp xếp

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { result } = await courseService.getAll();
        if (result?.result) {
          const sortedCourses = sortCourses(result.result, sortOrder);
          setCourses(sortedCourses);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [sortOrder]); // Lắng nghe thay đổi trong sortOrder

  // Hàm để sắp xếp khóa học
  const sortCourses = (courses: CoursesResultResType, order: SortOption) => {
    return [...courses].sort((a, b) => {
      // Thêm dấu ngoặc vuông [] để sao chép mảng courses
      switch (order) {
        case "courseName_asc":
          return a.courseName.localeCompare(b.courseName);
        case "courseName_desc":
          return b.courseName.localeCompare(a.courseName);
        case "price_asc":
          return a.coursePrice - b.coursePrice; // Giả sử khóa học có thuộc tính 'coursePrice' để sắp xếp
        case "price_desc":
          return b.coursePrice - a.coursePrice;
        case "rating_desc":
          return b.courseRating - a.courseRating; // Giả sử khóa học có thuộc tính 'courseRating' để sắp xếp
        case "uploadedAt_desc":
          return (
            new Date(b.courseUploadedAt).getTime() -
            new Date(a.courseUploadedAt).getTime()
          ); // Giả sử khóa học có thuộc tính 'courseUploadedAt'
        default:
          return 0;
      }
    });
  };

  return { courses, loading, error, setSortOrder }; // Trả về cả setSortOrder để có thể thay đổi thứ tự sắp xếp
}