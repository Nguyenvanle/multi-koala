import { logoutAction } from "@/features/auth/actions/logout";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  console.log("Middleware: Triggered for path:", path);

  if (request.nextUrl.searchParams.has("auth_processed")) {
    console.log("Middleware: Auth processed, continuing...");
    return NextResponse.next();
  }

  if (!token) {
    console.log("Middleware: No token found, logout actions...");
    await logoutAction();
    console.log("Middleware: Redirect to /login");
    return NextResponse.rewrite(new URL("/login?auth_processed", request.url));
  }

  console.log("Middleware: Token found, continuing...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
