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
