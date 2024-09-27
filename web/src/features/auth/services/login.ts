import { LoginResType } from "@/features/auth/types/login";
import { apiService } from "@/services/api";
import { nextjsApiService } from "@/services/next-api";
import { LoginBodyType } from "@/types/auth/schema/login";

export const loginService = {
  login: async (data: LoginBodyType) => {
    return await apiService.post<LoginResType>("/auth/login", data);
  },

  nextLogin: async (data: LoginBodyType) => {
    return await nextjsApiService.post<LoginResType>("api/auth/login", data);
  },
};
