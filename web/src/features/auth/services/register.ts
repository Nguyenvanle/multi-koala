import { RegisterResType } from "@/features/auth/types/register";
import { apiService } from "@/services/api";
import { RegisterBodyType } from "@/types/auth/schema/register";

export const registerService = {
  register: async (data: Omit<RegisterBodyType, "terms">) => {
    return await apiService.post<RegisterResType>("/teachers", data);
  },
};
