import { loginService } from "@/features/auth/services/login";
import { LoginBodyType } from "@/types/auth/schema/login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: LoginBodyType = await request.json();
    const response = await loginService.login(body);

    if (response.code === 200) {
      if (response?.result) {
        const { token, user } = response.result.result;

        // Tính toán thời gian hết hạn (ví dụ: 7 ngày từ hiện tại)
        const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
        const expires = expirationDate.toUTCString();
        // Tạo cookie string
        const cookieString = `token=${token}; Path=/; HttpOnly; Expires=${expires}; SameSite=Lax; Secure`;

        // Tạo response với user data
        const jsonResponse = NextResponse.json(
          {
            code: 200,
            message: "Request processed successfully!",
            result: {
              user,
              authenticated: true,
            },
          },
          { status: 200 }
        );

        // Thêm Set-Cookie header vào response
        jsonResponse.headers.set("Set-Cookie", cookieString);

        return jsonResponse;
      } else {
        return NextResponse.json(
          { code: response.code, message: "No result found" },
          { status: response.code }
        );
      }
    } else {
      return NextResponse.json(
        { code: response.code, message: response.message },
        { status: response.code }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
