import { RecentEnrollResType } from "@/features/enroll-courses/types/recent-enroll";
import { apiService } from "@/services/api";

export const EnrollCourseService = {
  getAllRecentEnroll: async (token: string) => {
    return apiService.get<RecentEnrollResType>(
      `/enroll-courses/recently-student-enrolled-my-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
