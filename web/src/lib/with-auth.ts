import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { validateToken } from "@/lib/token-handler"; // Đảm bảo rằng bạn đã import validateToken

type ServiceFunction<T> = (token: string) => Promise<{ result: T }>;

export function withAuth<T>(serviceFunction: ServiceFunction<T>) {
  return async (request: NextRequest) => {
    try {
      const cookieStore = cookies();
      const tokenCookie = cookieStore.get("token");

      if (!tokenCookie) {
        return NextResponse.json(
          { code: 401, message: "Authentication token is missing" },
          { status: 401 }
        );
      }

      // Kiểm tra tính hợp lệ của token
      const isValidToken = await validateToken(tokenCookie.value);
      if (!isValidToken) {
        return NextResponse.json(
          { code: 401, message: "Authentication token is invalid" },
          { status: 401 }
        );
      }

      const { result } = await serviceFunction(tokenCookie.value);

      if (!result) {
        return NextResponse.json(
          { code: 404, message: "No result found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result);
    } catch (error) {
      console.error("Error in API route:", error);
      return NextResponse.json(
        { code: 500, message: "An internal server error occurred" },
        { status: 500 }
      );
    }
  };
}

type ServiceFunctionWithData<T, D> = (
  token: string,
  data: D
) => Promise<{ result: T }>;

export function withAuthAndData<T, D>(
  serviceFunction: ServiceFunctionWithData<T, D>
) {
  return async (request: NextRequest) => {
    try {
      const cookieStore = cookies();
      const tokenCookie = cookieStore.get("token");

      if (!tokenCookie) {
        return NextResponse.json(
          { code: 401, message: "Authentication token is missing" },
          { status: 401 }
        );
      }

      // Kiểm tra tính hợp lệ của token
      const isValidToken = await validateToken(tokenCookie.value);
      if (!isValidToken) {
        return NextResponse.json(
          { code: 401, message: "Authentication token is invalid" },
          { status: 401 }
        );
      }

      // Lấy dữ liệu từ body
      const data: D = await request.json();

      if (!data) {
        return NextResponse.json(
          { code: 401, message: "Body data is missing" },
          { status: 401 }
        );
      }

      // Gọi hàm dịch vụ với cả token và dữ liệu
      const { result } = await serviceFunction(tokenCookie.value, data);

      if (!result) {
        return NextResponse.json(
          { code: 404, message: "No result found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result);
    } catch (error) {
      console.error("Error in API route:", error);
      return NextResponse.json(
        { code: 500, message: "An internal server error occurred" },
        { status: 500 }
      );
    }
  };
}

// Export a config object to make the route dynamic
export const dynamic = 'force-dynamic';
