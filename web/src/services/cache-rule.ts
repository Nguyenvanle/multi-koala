import { API_CONFIG } from "@/types/api/config";

export const shouldCache = (method: string, url: string): boolean => {
  if (method === "GET") {
    return API_CONFIG.cachableEndpoints.some((endpoint) =>
      url.startsWith(endpoint)
    );
  }
  return false;
};
