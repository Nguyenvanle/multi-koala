import API_CONFIG from "@/src/types/api/config";
import { LogoutBody, LogoutRes } from "../types/logout";

export const logoutServices = {
  logout: async (data: LogoutBody) => {
    return await API_CONFIG.post<LogoutRes>("/auth/login", data);
  },
};
