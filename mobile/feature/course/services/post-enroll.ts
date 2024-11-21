import API_CONFIG from "@/types/config";
import { EnrollRes } from "../types/post-enroll";

export const postEnrollCourseServices = {
  postEnroll: async (token: string, courseId: string) => {
    return await API_CONFIG.post<EnrollRes>(
      `/courses/${courseId}/enroll-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
