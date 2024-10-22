import { checkTokenValidity } from "@/features/auth/actions/check-token";
import { logoutAction } from "@/features/auth/actions/logout";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("Middleware triggered for path:", path);

  if (request.nextUrl.searchParams.has("auth_processed")) {
    console.log("Auth processed, continuing...");
    return NextResponse.next();
  }

  try {
    console.log("Validating token...");
    const { valid } = await checkTokenValidity();

    if (!valid) {
      console.log("Token is invalid, logout actions...");
      console.log("Redirect to /login");
      return NextResponse.rewrite(
        new URL("/login?auth_processed", request.url)
      );
    }

    console.log("Token is ok, continuing...");
    return NextResponse.next();
  } catch (error) {
    console.error("Error during middleware execution: ", error);
    console.log("Logout actions...");
    await logoutAction();
    console.log("Redirect to /login");
    return NextResponse.rewrite(new URL("/login?auth_processed", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
