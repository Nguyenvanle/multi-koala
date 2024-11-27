import API_CONFIG from "@/types/config";
import { PostEnrolled } from "../types/post-enroll";

export const postEnrollCourseServices = {
  postEnrolled: async (token: string, courseId: string) => {
    try {
      const response = await API_CONFIG.post<PostEnrolled>(
        `/courses/${courseId}/enroll-courses`,
        {}, // Empty body if no additional data needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Enrollment Service Error:", error);
      throw error;
    }
  },
};
