import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Tạo một cookie mới với thời gian hết hạn trong quá khứ để xóa cookie hiện tại
    const cookieString = `token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;

    // Tạo response
    const jsonResponse = NextResponse.json(
      {
        code: 200,
        message: "Logged out successfully",
      },
      { status: 200 }
    );

    // Thêm Set-Cookie header vào response để xóa cookie
    jsonResponse.headers.set("Set-Cookie", cookieString);

    return jsonResponse;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
