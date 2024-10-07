import { courseTypeService } from "@/features/course-type/services/course-type";
import { CourseTypesResultResType } from "@/features/course-type/types/course-type";
import useSWR from "swr";

// Định nghĩa fetcher function
const fetchCourseTypes = async () => {
  const { result } = await courseTypeService.getAll();
  return result?.result; // Trả về dữ liệu cần thiết
};

export default function useCourseType() {
  const { data, error } = useSWR("course-types", fetchCourseTypes);

  return {
    courseTypes: data as CourseTypesResultResType | null, // Chuyển đổi kiểu dữ liệu
    loading: !error && !data,
    error: error?.message || null,
  };
}