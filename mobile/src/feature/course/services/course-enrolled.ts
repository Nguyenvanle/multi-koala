import API_CONFIG from "@/src/types/api/config";
import { EnrolledResList } from "../types/course-enrolled";

export const enrolledServices = {
  getenrolled: async ({ token }: { token: string }) => {
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
