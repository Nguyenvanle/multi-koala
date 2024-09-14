import { FieldResType } from "@/features/field/types/field";
import { apiService } from "@/services/api";

export const fieldService = {
  getAll: async () => {
    return await apiService.get<FieldResType>("/fields");
  },
};
