import { logoutService } from "@/features/auth/services/logout";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/features/auth/enum/auth";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

    if (token) {
      // Gọi API logout với token
      const response = await logoutService.logout({
        token: token,
      });

      // Xóa cookie
      cookieStore.delete(TOKEN_COOKIE_NAME);

      // Tạo response
      return NextResponse.json(
        {
          code: response.result?.code,
          message: "Logged out successfully",
        },
        { status: 200 }
      );
    }

    // Nếu không tìm thấy token, trả về mã lỗi 401 với thông điệp cụ thể
    return NextResponse.json(
      {
        code: 401,
        message: "Token has expired or is invalid. Please log in again.",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { code: 500, message: "An internal nextjs server error occurred" },
      { status: 500 }
    );
  }
}