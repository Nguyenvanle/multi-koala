// src/services/api/request.ts

import { ApiCache } from "@/services/cache";
import { shouldCache } from "@/services/cache-rule";
import { API_CONFIG } from "@/types/api/config";

export class ApiRequest {
  private cache: ApiCache;

  constructor(cache: ApiCache) {
    this.cache = cache;
  }

  private async performRequest<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    const defaultConfig: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    };

    const mergedConfig: RequestInit = {
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config?.headers,
      },
    };

    if (data) {
      mergedConfig.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${url}`, mergedConfig);
      const responseData = await response.json();

      return {
        code: response.status,
        result: responseData,
        error: null,
        message: "",
      };
    } catch (error) {
      return {
        code: 500,
        result: null,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        message: "Request failed",
      };
    }
  }

  public async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    const cacheKey = `${method}-${url}`;

    if (shouldCache(method, url)) {
      const cachedData = this.cache.get<T>(cacheKey);
      if (cachedData) {
        console.log(`Using cached data for ${url}`);
        return cachedData;
      }
    }

    const result = await this.performRequest<T>(method, url, data, config);

    if (shouldCache(method, url)) {
      console.log(`Caching data for ${url}`);
      this.cache.set(cacheKey, result);
    }

    return result;
  }
}
