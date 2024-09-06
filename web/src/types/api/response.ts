// Thêm type cho response data của AxiosError
interface AxiosErrorResponse {
  message?: string;
}

// Create Response Interface
interface ApiResponse<T> {
  result: T | null;
  error: string | null;
  message: string | null;
}
