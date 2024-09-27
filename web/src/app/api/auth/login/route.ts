import { loginService } from "@/features/auth/services/login";
import { setCookie } from "@/lib/set-cookie";
import { TOKEN_EXPIRY } from "@/middleware";
import { LoginBodyType } from "@/types/auth/schema/login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: LoginBodyType = await request.json();
    const response = await loginService.login(body);

    if (response.code === 200) {
      if (response?.result) {
        const { token, user } = response.result.result;

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

        setCookie(jsonResponse, token, TOKEN_EXPIRY);

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
