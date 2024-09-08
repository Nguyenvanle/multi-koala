import { ApiCache } from "@/services/cache";
import { ApiRequest } from "@/services/request";

export class ApiService {
  private static instance: ApiService;
  private cache: ApiCache;
  private request: ApiRequest;

  private constructor() {
    this.cache = new ApiCache();
    this.request = new ApiRequest(this.cache);
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async get<T>(
    url: string,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request.request<T>("GET", url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request.request<T>("POST", url, data, config);
  }

  public clearCache(): void {
    this.cache.clear();
    console.log("Cache cleared");
  }
}

/**
 * @example
 * import { apiService } from './services/api';
 * const courses = await apiService.get('/courses');
 * const updatedUser = await apiService.post('/api/user/update', { name: 'New Name' });
 * apiService.clearCache();
 */
export const apiService = ApiService.getInstance();
