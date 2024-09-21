import API_CONFIG from "@/src/types/api/config";
import { AuthRes } from "../types/auth";

export const authServices = {
  login: async (username: string, password: string) => {
    return await API_CONFIG.post<AuthRes>("/auth/login", {
      username,
      password,
    });
  },
};
