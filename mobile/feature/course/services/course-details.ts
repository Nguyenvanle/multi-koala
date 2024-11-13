import API_CONFIG from "@/types/config";
import { CourseDetailsRes } from "../types/course-details";

export const detailsServices = {
  getdetails: async ({ courseId }: { courseId: string }) => {
    return await API_CONFIG.get<CourseDetailsRes>(`/courses/${courseId}`);
  },
};
