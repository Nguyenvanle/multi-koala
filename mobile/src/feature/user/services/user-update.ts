import API_CONFIG from "@/src/types/api/config";
import { UserPost, UserRes } from "../types/user-update";

export const userUpdateServices = {
  getUserUpdate: async (submitUpdated: UserPost, token: string) => {
    return await API_CONFIG.put<UserRes>("/students/me", submitUpdated, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
