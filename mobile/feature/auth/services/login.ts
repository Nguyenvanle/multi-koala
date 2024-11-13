import API_CONFIG from "@/types/config";
import { LoginRes } from "../types/login";
import { LoginBody } from "@/feature/auth/types/login";

export const loginServices = {
  login: async (data: LoginBody) => {
    return await API_CONFIG.post<LoginRes>("/auth/login", data);
  },
};
