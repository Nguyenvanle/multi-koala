import API_CONFIG from "@/src/types/api/config";
import { LoginRes } from "../types/login";
import { LoginBody } from "@/src/feature/auth/types/login";

export const loginServices = {
  login: async (data: LoginBody) => {
    try {
      return await API_CONFIG.post<LoginRes>("/auth/login", data);
    } catch (error) {
      console.log(error);
      return await API_CONFIG.post<LoginRes>("/auth/login", data);
    }
  },
};
