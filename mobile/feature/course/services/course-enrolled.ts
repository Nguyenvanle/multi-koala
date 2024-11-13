import API_CONFIG from "@/types/config";
import { EnrolledResList } from "../types/course-enrolled";

export const enrolledServices = {
  getEnrolled: async ({ token }: { token: string }) => {
    return await API_CONFIG.get<EnrolledResList>(
      `/enroll-courses/my-enrolled-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
