import API_CONFIG from "@/src/types/api/config";
import { CourseDetailsRes } from "../types/course-details";

export const detailsServices = {
  getdetails: async ({ courseId }: { courseId: string }) => {
    return await API_CONFIG.get<CourseDetailsRes>(`/courses/${courseId}`);
  },
};
