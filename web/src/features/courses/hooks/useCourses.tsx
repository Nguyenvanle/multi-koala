import { useEffect, useState, useCallback } from "react";
import { courseService } from "@/features/courses/services/courses";
import { CoursesResultResType } from "@/features/courses/types/course";
import { SortOption } from "@/features/courses/components/molecules/select-sort";

export default function useCourses() {
  const [courses, setCourses] = useState<CoursesResultResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOption>("rating_desc");
  const [filterKeyword, setFilterKeyword] = useState<string>("");

  // Hàm để tính giá trị sau khi áp dụng giảm giá
  const getDiscountedPrice = useCallback(
    (coursePrice: number, courseDiscount: number) => {
      return coursePrice - coursePrice * courseDiscount;
    },
    []
  );

  // Hàm để sắp xếp khóa học
  const sortCourses = useCallback(
    (courses: CoursesResultResType, order: SortOption) => {
      return [...courses].sort((a, b) => {
        const aDiscountedPrice = getDiscountedPrice(
          a.coursePrice,
          a.discountApprovedRate
        );
        const bDiscountedPrice = getDiscountedPrice(
          b.coursePrice,
          b.discountApprovedRate
        );

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
            return b.courseRating - a.courseRating;
          case "uploadedAt_desc":
            return (
              new Date(b.courseUploadedAt).getTime() -
              new Date(a.courseUploadedAt).getTime()
            );
          default:
            return 0;
        }
      });
    },
    [getDiscountedPrice]
  );

  const filterCourses = useCallback(
    (courses: CoursesResultResType, keyword: string) => {
      if (!keyword) return courses;

      return courses.filter((course) =>
        course.courseName.toLowerCase().includes(keyword.toLowerCase())
      );
    },
    []
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { result } = await courseService.getAll();

        if (result?.result) {
          const filteredCourses = filterCourses(result.result, filterKeyword);
          const sortedCourses = sortCourses(filteredCourses, sortOrder);

          setCourses(sortedCourses);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [sortOrder, filterKeyword, sortCourses, filterCourses]);

  return { courses, loading, error, setSortOrder, setFilterKeyword };
}
