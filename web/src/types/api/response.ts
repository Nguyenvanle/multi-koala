// Thêm type cho response data của AxiosError
interface ErrorResponse {
  code: number;
  message: string;
}

// Create Response Interface
interface ApiResponse<T> {
  code: number;
  message: string;
  result: T | null;
}
