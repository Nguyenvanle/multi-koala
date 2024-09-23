import API_CONFIG from "@/src/types/api/config";
import { LoginRes } from "../types/login";
import { LoginBody } from "@/src/types/auth/schema/login";

export const loginServices = {
  login: async (data: LoginBody) => {
    console.log(1);
    console.log(process.env.EXPO_PUBLIC_API_ENDPOINT);
    return await API_CONFIG.post<LoginRes>("/auth/login", data);
  },
};
