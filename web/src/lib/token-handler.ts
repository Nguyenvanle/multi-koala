import {
  CLEAR_LOCAL_STORAGE_PATH,
  TOKEN_COOKIE_NAME,
} from "@/features/auth/enum/auth";
import { introspectServices } from "@/features/auth/services/introspect";
import { refreshServices } from "@/features/auth/services/refresh";
import { NextRequest, NextResponse } from "next/server";

export async function validateToken(token: string): Promise<boolean> {
  const { result } = await introspectServices.checkValid({ token });
  return result?.result.valid ?? false;
}

export async function refreshToken(token: string): Promise<string | null> {
  const { result } = await refreshServices.refresh({ token });
  return result?.code === 200 ? result.result.token : null;
}

export function handleInvalidToken(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
}
