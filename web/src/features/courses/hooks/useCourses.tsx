import { useEffect, useState, useCallback } from "react";
import { courseService } from "@/features/courses/services/courses";
import { CoursesResultResType } from "@/features/courses/types/course";
import { SortOption } from "@/features/courses/components/molecules/select-sort";
import { FilterFactory } from "@/features/filter/services/factory";

export default function useCourses() {
  const [courses, setCourses] = useState<CoursesResultResType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOption>("rating_desc");
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

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

  const applyFilters = useCallback(
    (courses: CoursesResultResType) => {
      return Object.entries(filters).reduce(
        (filteredCourses, [filterType, filterValue]) => {
          const filterStrategy = FilterFactory.createFilter(filterType);
          return filterStrategy.apply(filteredCourses, filterValue);
        },
        courses
      );
    },
    [filters]
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { result } = await courseService.getAll();

        if (result?.result) {
          const filteredCourses = applyFilters(result.result);
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
  }, [sortOrder, filters, sortCourses, applyFilters]);

  const updateFilter = useCallback((filterType: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  }, []);

  return { courses, loading, error, setSortOrder, updateFilter };
}
