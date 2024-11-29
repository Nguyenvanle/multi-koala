import API_CONFIG from "@/types/config";
import { SuggestEnrolled } from "../types/enrolled";

export const SuggestEnrolledServices = {
  getEnrolled: async ({ enrollId }: { enrollId: string }) => {
    return await API_CONFIG.get<SuggestEnrolled>(`/enroll-courses/${enrollId}`);
  },
};
