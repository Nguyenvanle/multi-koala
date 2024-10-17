import { checkTokenValidity } from "@/features/auth/actions/check-token";
import { logoutAction } from "@/features/auth/actions/logout";
import { SECURE_PATHS, TOKEN_COOKIE_NAME } from "@/features/auth/enum/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const securePathSet = new Set(SECURE_PATHS);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // Log the path and token for debugging
  console.log("Middleware triggered for path:", path);
  console.log("Token found in cookies:", token ? true : false);

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
      ? NextResponse.redirect(new URL("/login?auth_processed", request.url))
      : NextResponse.next();
  }

  try {
    // Token validation
    console.log("Validating token...");
    const { valid } = await checkTokenValidity();

    if (!valid) {
      console.log("Token is invalid, logout actions...");
      // await logoutAction();
      console.log("Redirect to /login");
      return NextResponse.redirect(
        new URL("/login?auth_processed", request.url)
      );
    }

    console.log("Token is valid, continuing...");
    return NextResponse.next();
  } catch (error) {
    console.error("Error during middleware execution: ", error);
    console.log("Logout actions...");
    await logoutAction();
    console.log("Redirect to /login");
    return NextResponse.redirect(new URL("/login?auth_processed", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
