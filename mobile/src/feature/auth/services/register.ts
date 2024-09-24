import API_CONFIG from "@/src/types/api/config";
import { RegisterBody, RegisterRes } from "../types/register";

export const registerServices = {
  register: async (data: RegisterBody) => {
    return await API_CONFIG.post<RegisterRes>("/students", data);
  },
};
