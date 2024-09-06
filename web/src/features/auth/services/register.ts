import { apiService } from "@/services/api";
import { RegisterResType } from "@/types/auth/schema/auth";
import { RegisterBodyType } from "@/types/auth/schema/register";

export const registerService = {
  register: async (data: Omit<RegisterBodyType, "terms">) => {
    return await apiService.post<RegisterResType>("/teachers", data);
  },
};
