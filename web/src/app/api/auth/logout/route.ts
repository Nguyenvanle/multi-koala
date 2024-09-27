import { logoutService } from "@/features/auth/services/logout";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Lấy cookie từ request
    const cookieHeader = request.headers.get("cookie");
    
    // Tách token từ cookie
    const token = cookieHeader?.split('; ').find(row => row.startsWith('token='));

    if (token) {
      const tokenValue = token.split('=')[1];

      // Gọi API logout với token
      const response = await logoutService.logout({
        token: tokenValue
      });

      // Tạo một cookie mới với thời gian hết hạn trong quá khứ để xóa cookie hiện tại
      const cookieString = `token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;

      // Tạo response
      const jsonResponse = NextResponse.json(
        {
          code: response.result?.code,
          message: "Logged out successfully",
        },
        { status: 200 }
      );

      // Thêm Set-Cookie header vào response để xóa cookie
      jsonResponse.headers.set("Set-Cookie", cookieString);

      return jsonResponse;
    }

    // Nếu không tìm thấy token, trả về mã lỗi 400
    return NextResponse.json(
      { code: 400, message: "Token not found" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}