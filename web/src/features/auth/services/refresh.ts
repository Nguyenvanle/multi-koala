import { RefreshBodyType, RefreshResType } from "@/features/auth/types/refresh";
import { apiService } from "@/services/api";

export const refreshServices = {
  refresh: async (body: RefreshBodyType) => {
    return await apiService.post<RefreshResType>("/auth/refresh", body);
  },
};
