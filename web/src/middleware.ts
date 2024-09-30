import {
  SECURE_PATHS,
  TOKEN_COOKIE_NAME,
  LOGIN_PATH,
  CLEAR_LOCAL_STORAGE_PATH,
  TOKEN_EXPIRY,
} from "@/features/auth/enum/auth";
import { validateToken, refreshToken, handleInvalidToken } from "@/lib/token-handler";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
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
    // Chuyển hướng đến trang xóa localStorage
    return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
  }

  if (token) {
    try {
      // Thực hiện kiểm tra token
      const isValid = await validateToken(token.value);
      if (!isValid) {
        // Token không hợp lệ, thử refresh
        const newToken = await refreshToken(token.value);

        if (newToken) {
          // Refresh thành công, cập nhật token mới
          response.cookies.set(TOKEN_COOKIE_NAME, newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: TOKEN_EXPIRY, // 4 ngày
            path: '/',
          });
          return response;
        } else {
          // Refresh thất bại, xử lý như token không hợp lệ
          console.log('Không hợp lệ')
          return handleInvalidToken(response, request);
        }
      }
    } catch (error) {
      console.error("Error validating/refreshing token:", error);
      // Xử lý lỗi, chuyển hướng đến trang xóa localStorage
      return handleInvalidToken(response, request);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};