// Thêm type cho response data của AxiosError
interface AxiosErrorResponse {
  code: number;
  message?: string;
}

// Create Response Interface
interface ApiResponse<T> {
  code: number | undefined;
  result: T | null;
  error: string | null;
  message: string | null;
}
