type ApiResponse<T> = {
  code: number;
  result: T | null;
  error: string | null;
  message: string;
};

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;
  private cache = new Map<string, ApiResponse<any>>();

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    const cacheKey = `${method}-${url}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey) as ApiResponse<T>;
    }

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
      const response = await fetch(`${this.baseUrl}${url}`, mergedConfig);
      const responseData = await response.json();

      const result: ApiResponse<T> = {
        code: response.status,
        result: responseData,
        error: null,
        message: "",
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      return {
        code: 500,
        result: null,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        message: "Request failed",
      };
    }
  }

  public async get<T>(url: string, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, config);
  }

  public async post<T>(url: string, data?: any, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, config);
  }

  // Thêm các phương thức khác nếu cần
}

export const apiService = ApiService.getInstance();