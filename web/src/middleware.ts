import { introspectServices } from "@/features/auth/services/introspect";
import { refreshServices } from "@/features/auth/services/refresh";
import { setCookie } from "@/lib/set-cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_COOKIE_NAME = "token";
const LOGIN_URL = "/login";
const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get(TOKEN_COOKIE_NAME);

  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const tokenValue = token.value;
    const isTokenValid = await validateToken(tokenValue);

    if (isTokenValid) {
      return response;
    }

    const newToken = await refreshToken(tokenValue);

    if (newToken) {
      setCookie(response, newToken, TOKEN_EXPIRY);
      return response;
    }

    return handleInvalidToken(response, request);
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return handleInvalidToken(response, request);
  }
}

async function validateToken(token: string): Promise<boolean> {
  const { result } = await introspectServices.checkValid({ token });
  return result?.result.valid ?? false;
}

async function refreshToken(token: string): Promise<string | null> {
  const { result } = await refreshServices.refresh({ token });
  return result?.code === 200 ? result.result.token : null;
}

function redirectToLogin(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(LOGIN_URL, request.url));
}

function handleInvalidToken(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return redirectToLogin(request);
}

export const config = {
  matcher: "/dashboard/:path*",
};
