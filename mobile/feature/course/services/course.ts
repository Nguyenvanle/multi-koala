import API_CONFIG from "@/types/config";
import { CourseResList } from "../types/course";

export const courseServices = {
  getcourse: async () => {
    return await API_CONFIG.get<CourseResList>(`/courses/approved-courses`);
  },
};
