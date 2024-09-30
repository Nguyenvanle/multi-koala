import {
  CLEAR_LOCAL_STORAGE_PATH,
  TOKEN_COOKIE_NAME,
} from "@/features/auth/enum/auth";
import { introspectServices } from "@/features/auth/services/introspect";
import { refreshServices } from "@/features/auth/services/refresh";
import { NextRequest, NextResponse } from "next/server";

export async function validateToken(token: string): Promise<boolean> {
  const { result, error } = await introspectServices.checkValid({ token });
  console.log("validate:", {
    createAt: new Date().toLocaleTimeString(),
    result,
  });
  return result?.result.valid ?? false;
}

export async function refreshToken(token: string): Promise<string | null> {
  console.log("refresh: ", {
    createAt: new Date().toLocaleTimeString(),
    token,
  });
  const res = await refreshServices.refresh({ token });
  if (res.result?.result.token) return res.result.result.token;
  else {
    console.log("refresh failed: ", {
      createAt: new Date().toLocaleTimeString(),
      res,
    });
    return null;
  }
}

export function handleInvalidToken(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  console.log("deleted token", {
    createAt: new Date().toLocaleTimeString(),
    request: request,
    response: response,
  });
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
}
