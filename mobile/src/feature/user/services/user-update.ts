import API_CONFIG from "@/src/types/api/config";
import { UserPost, UserRes } from "../types/user-update";

export const userUpdateServices = {
  getUserUpdate: async (
    { submitUpdate }: { submitUpdate: UserPost },
    { token }: { token: string }
  ) => {
    return await API_CONFIG.post<UserRes>("/students/me", submitUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
