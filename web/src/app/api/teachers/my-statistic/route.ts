import { teacherService } from "@/features/users/services/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Lấy cookie từ request
    const cookieHeader = request.headers.get("cookie");

    // Tách token từ cookie
    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("token="));

    if (!token) {
      return NextResponse.json(
        {
          code: 401,
          message: "Authentication token is missing",
        },
        { status: 401 }
      );
    }

    const tokenValue = token.split("=")[1];

    // Gọi teacherService với token trong header
    const { result } = await teacherService.getStatistic(tokenValue);

    if (!result) {
      return NextResponse.json(
        {
          code: 401,
          message: "No result found",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in teacher statistics API route:", error);
    return NextResponse.json(
      {
        code: 500,
        message: "An internal nextjs server error occurred",
      },
      { status: 500 }
    );
  }
}
