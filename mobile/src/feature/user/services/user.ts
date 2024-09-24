import API_CONFIG from "@/src/types/api/config";
import { UserBody, UserRes } from "../types/user";

export const userServices = {
  user: async ({ token }: { token: string }) => {
    return await API_CONFIG.post<UserRes>("/students/me", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
