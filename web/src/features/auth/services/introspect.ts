import {
  IntrospectBodyType,
  IntrospectResType,
} from "@/features/auth/types/introspect";
import { apiService } from "@/services/api";

export const introspectServices = {
  checkValid: async (body: IntrospectBodyType) => {
    return await apiService.post<IntrospectResType>("/auth/introspect", body);
  },
};
