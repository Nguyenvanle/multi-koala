import {
  SECURE_PATHS,
  TOKEN_COOKIE_NAME,
  LOGIN_PATH,
} from "@/features/auth/enum/auth";
import { validateToken } from "@/lib/token-handler";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE_NAME);
  const path = request.nextUrl.pathname;
  const isSecurePath = SECURE_PATHS.some((securePath) =>
    path.startsWith(securePath)
  );

  // Kiểm tra nếu đã xử lý xác thực (tránh vòng lặp)
  if (request.nextUrl.searchParams.has("auth_processed")) {
    return NextResponse.next();
  }

  if (!token && isSecurePath) {
    // Chuyển hướng đến trang đăng nhập với flag xử lý xác thực
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("auth_processed", "true");
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    try {
      // Thực hiện kiểm tra token ở đây
      const isValid = await validateToken(token.value);
      if (!isValid) {
        // Token không hợp lệ, chuyển hướng đến đăng nhập và xóa token
        const response = NextResponse.redirect(
          new URL(LOGIN_PATH, request.url)
        );
        response.cookies.delete(TOKEN_COOKIE_NAME);
        return response;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      // Xử lý lỗi, chuyển hướng đến đăng nhập
      const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
      response.cookies.delete(TOKEN_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
