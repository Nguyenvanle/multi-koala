import API_CONFIG from "@/src/types/api/config";
import { UserRes } from "../types/user";

export const userServices = {
  getuser: async ({ token }: { token: string }) => {
    return await API_CONFIG.get<UserRes>("/students/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
