import { CoursePricesBodyType } from "@/features/course-prices/types/course-prices";
import { courseService } from "@/features/courses/services/courses";
import useSWR from "swr";

export default function useCoursePricesRange() {
  const { data, error, isLoading } = useSWR(`prices-range`, () =>
    courseService.getPriceRange()
  );

  return {
    pricesRange: data?.result?.result as CoursePricesBodyType,
    isLoading: isLoading || error,
    error: error,
  };
}
