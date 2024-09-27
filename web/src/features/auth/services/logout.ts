import { logoutBodyType, LogoutResType } from "@/features/auth/types/logout";
import { apiService } from "@/services/api";

export const logoutService = {
  logout: async (data: logoutBodyType) => {
    return await apiService.post<LogoutResType>("/auth/logout", data.token);
  },
};
