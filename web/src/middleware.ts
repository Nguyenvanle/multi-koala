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
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // Log the path and token for debugging
  console.log("Middleware triggered for path:", path);
  console.log("Token found in cookies:", token ? "Yes" : "No");

  if (request.nextUrl.searchParams.has("auth_processed")) {
    console.log("Auth processed, continuing...");
    return NextResponse.next();
  }

  const isSecurePath =
    securePathSet.has(path) ||
    Array.from(securePathSet).some((prefix) => path.startsWith(prefix));

  if (!token) {
    console.log("No token found. Checking secure path...");
    return isSecurePath
      ? redirectToClearLocalStorage(request)
      : NextResponse.next();
  }

  try {
    // Token validation
    console.log("Validating token...");
    if (await validateToken(token)) {
      console.log("Token is valid, proceeding...");
      return NextResponse.next();
    }

    // Token refresh attempt
    console.log("Token invalid, attempting to refresh...");
    const newToken = await refreshToken(token);

    if (newToken) {
      console.log("Token refreshed successfully.");
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

    // Handle invalid token
    console.log("Failed to refresh token, handling invalid token...");
    return handleInvalidToken(request, token);
  } catch (error) {
    console.error("Error during middleware execution:", error);
    return handleInvalidToken(request, token);
  }
}

function redirectToClearLocalStorage(request: NextRequest): NextResponse {
  console.log("Redirecting to clear local storage...");
  return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
