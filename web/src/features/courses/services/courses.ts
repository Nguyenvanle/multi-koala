import { CoursePricesResType } from "@/features/course-prices/types/course-prices";
import { EditCourseFormData } from "@/features/courses/hooks/useEditCourseForm";
import {
  CourseDetailResType,
  CourseResType,
} from "@/features/courses/types/course";
import { CourseCreatePayloadType } from "@/features/courses/types/course-create";
import { MyPerformingCoursesResType } from "@/features/courses/types/course-perform";
import { TeacherMyCoursesResType } from "@/features/courses/types/teacher-my-courses";
import { DiscountResType } from "@/features/discount/types/discount";
import { RatingResType } from "@/features/rating/types/rating";
import { apiService } from "@/services/api";

export const courseService = {
  getAll: async () => {
    return await apiService.get<CourseResType>("/courses");
  },

  getMyCourses: async (token: string) => {
    return await apiService.get<TeacherMyCoursesResType>(
      "/courses/my-statistic-courses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getPriceRange: async () => {
    return await apiService.get<CoursePricesResType>(`/courses/course-price`);
  },

  getDetail: async (courseId: string) => {
    return await apiService.get<CourseDetailResType>(`/courses/${courseId}`);
  },

  // need refactor
  getAllStudent: async (courseId: string) => {
    return await apiService.get<any>(`/courses/${courseId}/students`);
  },

  getDiscount: async (courseId: string) => {
    return await apiService.get<DiscountResType>(
      `/courses/${courseId}/discount-applied`
    );
  },

  getRating: async (courseId: string) => {
    return await apiService.get<RatingResType>(
      `/courses/${courseId}/reviews/avg-rating`
    );
  },

  getMyPerformingCourses: async (token: string) => {
    return await apiService.get<MyPerformingCoursesResType>(
      `/courses/my-performing-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  createNewCourse: async (token: string, data: CourseCreatePayloadType) => {
    return await apiService.post<CourseDetailResType>(`/courses`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateCourses: async (
    token: string,
    courseId: string,
    data: EditCourseFormData
  ) => {
    return await apiService.put<CourseDetailResType>(
      `/courses/${courseId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
