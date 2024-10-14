import {
  SECURE_PATHS,
  TOKEN_COOKIE_NAME,
  CLEAR_LOCAL_STORAGE_PATH,
  TOKEN_EXPIRY,
} from "@/features/auth/enum/auth";
import { validateToken, refreshToken, handleInvalidToken } from "@/lib/token-handler";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const securePathSet = new Set(SECURE_PATHS);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (request.nextUrl.searchParams.has("auth_processed")) {
    return NextResponse.next();
  }

  const isSecurePath =
    securePathSet.has(path) ||
    Array.from(securePathSet).some((prefix) => path.startsWith(prefix));

  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return isSecurePath
      ? redirectToClearLocalStorage(request)
      : NextResponse.next();
  }

  try {
    if (await validateToken(token)) {
      console.log("next");
      return NextResponse.next();
    }

    const newToken = await refreshToken(token);

    if (newToken) {
      const response = NextResponse.next();
      response.cookies.set(TOKEN_COOKIE_NAME, newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: TOKEN_EXPIRY,
        path: "/",
      });
      return response;
    }

    return handleInvalidToken(request);
  } catch (error) {
    console.error("Error in middleware:", error);
    return handleInvalidToken(request);
  }
}

function redirectToClearLocalStorage(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};