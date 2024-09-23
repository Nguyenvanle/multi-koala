import { CertificationsResponse } from "@/features/certification/types/certification-res";
import { CourseResType } from "@/features/courses/types/course";
import { TeacherRatingResType } from "@/features/rating/types/teacher-rating";
import {
  TeacherDetailResponse,
  TeachersResponse,
} from "@/features/users/types/teacher-res";
import { apiService } from "@/services/api";

export const teacherService = {
  getAll: async () => {
    return await apiService.get<TeachersResponse>("/teachers");
  },

  getById: async (teacherId: string) => {
    return await apiService.get<TeacherDetailResponse>(
      `/teachers/${teacherId}`
    );
  },

  getAllCourses: async (teacherId: string) => {
    return await apiService.get<CourseResType>(
      `/teachers/${teacherId}/courses`
    );
  },

  getAllCertifications: async (teacherId: string) => {
    return await apiService.get<CertificationsResponse>(
      `/teachers/${teacherId}/certifications`
    );
  },

  getRating: async (teacherId: string) => {
    return await apiService.get<TeacherRatingResType>(
      `/teachers/${teacherId}/reviews/avg-rating`
    );
  },
};
