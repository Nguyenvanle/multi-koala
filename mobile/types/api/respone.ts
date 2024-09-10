// Thêm type cho response data của AxiosError
interface ErrorResponse {
  code: number;
  message: string;
}

// src/services/api/types.ts
type ApiResponse<T> = {
  code: number;
  result: T | null;
  error: string | null;
  message: string;
};
