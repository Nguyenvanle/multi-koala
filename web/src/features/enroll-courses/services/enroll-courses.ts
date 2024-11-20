import { StudentChartResType } from "@/features/enroll-courses/types/my-student-chart";
import { RecentEnrollResType } from "@/features/enroll-courses/types/recent-enroll";
import { apiService } from "@/services/api";

export const enrollCourseService = {
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

  getStudentChart: async (token: string) => {
    return apiService.get<StudentChartResType>(
      `/enroll-courses/enroll-courses/my-student-chart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
