import API_CONFIG from "@/types/config";
import { UserRes } from "../types/user";

export const userServices = {
  getUser: async ({ token }: { token: string }) => {
    return await API_CONFIG.get<UserRes>("/students/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
