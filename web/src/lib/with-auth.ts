import { NextRequest, NextResponse } from "next/server";

type ServiceFunction<T> = (token: string) => Promise<{ result: T }>;

export function withAuth<T>(serviceFunction: ServiceFunction<T>) {
  return async (request: NextRequest) => {
    try {
      const cookieHeader = request.headers.get("cookie");
      const token = cookieHeader
        ?.split("; ")
        .find((row) => row.startsWith("token="));

      if (!token) {
        return NextResponse.json(
          { code: 401, message: "Authentication token is missing" },
          { status: 401 }
        );
      }

      const tokenValue = token.split("=")[1];
      const { result } = await serviceFunction(tokenValue);

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
      const cookieHeader = request.headers.get("cookie");
      const token = cookieHeader
        ?.split("; ")
        .find((row) => row.startsWith("token="));

      if (!token) {
        return NextResponse.json(
          { code: 401, message: "Authentication token is missing" },
          { status: 401 }
        );
      }

      const tokenValue = token.split("=")[1];

      // Lấy dữ liệu từ body
      const data: D = await request.json();

      if (!data) {
        return NextResponse.json(
          { code: 401, message: "body data is missing" },
          { status: 401 }
        );
      }

      // Gọi hàm dịch vụ với cả token và dữ liệu
      const { result } = await serviceFunction(tokenValue, data);

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

