import {
  CourseDetailResType,
  CourseDetailResultResType,
} from "@/features/courses/types/course";
import { CourseCreatePayloadType } from "@/features/courses/types/course-create";
import { nextjsApiService } from "@/services/next-api";
import useSWR from "swr";

export default function useCreateCourse(courseData: CourseCreatePayloadType) {
  const { data, error } = useSWR(`create-course`, () =>
    nextjsApiService.post<CourseDetailResType>(`/api/courses/add`, courseData)
  );

  return {
    course: data?.result?.result as CourseDetailResultResType,
    loading: !error && !data,
    error: error?.message,
  };
}
