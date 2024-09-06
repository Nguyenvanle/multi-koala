import { LoginResType } from "@/features/auth/types/login";
import { apiService } from "@/services/api";
import { LoginBodyType } from "@/types/auth/schema/login";

export const loginService = {
  login: async (data: LoginBodyType) => {
    return await apiService.post<LoginResType>("/auth/login", data);
  },
};
