// src/services/nextjs-api-service.ts

class NextjsApiService {
  private static instance: NextjsApiService;

  private constructor() {}

  public static getInstance(): NextjsApiService {
    if (!NextjsApiService.instance) {
      NextjsApiService.instance = new NextjsApiService();
    }
    return NextjsApiService.instance;
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    const defaultConfig: RequestInit = {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
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
      const response = await fetch(url, mergedConfig);
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

  public async get<T>(
    url: string,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, config);
  }

  // Add other methods (PUT, DELETE, etc.) as needed
}

export const nextjsApiService = NextjsApiService.getInstance();
