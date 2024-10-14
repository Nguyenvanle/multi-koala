import { logoutBodyType, LogoutResType } from "@/features/auth/types/logout";
import { apiService } from "@/services/api";
import { nextjsApiService } from "@/services/next-api";

export const logoutService = {
  logout: async (data: logoutBodyType) => {
    return await apiService.post<LogoutResType>("/auth/logout", data.token);
  },

  nextLogout: async () => {
    return await nextjsApiService.post<LogoutResType>("/api/auth/logout");
  },
};
