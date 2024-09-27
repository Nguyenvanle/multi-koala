import { introspectServices } from "@/features/auth/services/introspect";
import { refreshServices } from "@/features/auth/services/refresh";
import { setCookie } from "@/lib/set-cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const TOKEN_EXPIRY = 4 * 24 * 60 * 60 * 1000; // 4 day

const TOKEN_COOKIE_NAME = "token";
const SECURE_PATHS = ["/dashboard"];
const CLEAR_LOCAL_STORAGE_PATH = "/logout";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = request.cookies.get(TOKEN_COOKIE_NAME);
  const path = request.nextUrl.pathname;

  const isSecurePath = SECURE_PATHS.some((securePath) =>
    path.startsWith(securePath)
  );

  if (token) {
    try {
      const tokenValue = token.value;
      const isTokenValid = await validateToken(tokenValue);

      if (!isTokenValid) {
        const newToken = await refreshToken(tokenValue);

        if (newToken) {
          setCookie(response, newToken, TOKEN_EXPIRY);
        } else {
          // Token is invalid and can't be refreshed, clear it and redirect to clear localStorage
          return handleInvalidToken(response, request);
        }
      }
    } catch (error) {
      console.error("Error in auth middleware:", error);
      return handleInvalidToken(response, request);
    }
  } else if (isSecurePath) {
    // No token and trying to access a secure path
    return NextResponse.redirect(
      new URL(CLEAR_LOCAL_STORAGE_PATH, request.url)
    );
  }

  return response;
}

async function validateToken(token: string): Promise<boolean> {
  const { result } = await introspectServices.checkValid({ token });
  return result?.result.valid ?? false;
}

async function refreshToken(token: string): Promise<string | null> {
  const { result } = await refreshServices.refresh({ token });
  return result?.code === 200 ? result.result.token : null;
}

function handleInvalidToken(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};