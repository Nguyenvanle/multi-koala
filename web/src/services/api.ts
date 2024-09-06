import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios({
        ...config,
        url: `${this.baseUrl}${config.url}`,
      });

      return { result: response.data, error: null, message: "" };
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;

      return {
        result: null,
        error:
          axiosError.response?.data?.message || "An unexpected error occurred",
        message: axiosError.message,
      };
    }
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "POST", url, data });
  }

  //more methods
}

export const apiService = ApiService.getInstance();
