import {
  CLEAR_LOCAL_STORAGE_PATH,
  TOKEN_COOKIE_NAME,
} from "@/features/auth/enum/auth";
import { introspectServices } from "@/features/auth/services/introspect";
import { refreshServices } from "@/features/auth/services/refresh";
import { NextRequest, NextResponse } from "next/server";

export async function validateToken(token: string): Promise<boolean> {
  const { result, error } = await introspectServices.checkValid({ token });
  console.log("validate:", result);
  return result?.result.valid ?? false;
}

export async function refreshToken(token: string): Promise<string | null> {
  const { result, error } = await refreshServices.refresh({ token });
  console.log("refresh: ", result);
  return result?.code === 200 ? result.result.token : null;
}

export function handleInvalidToken(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  console.log("deleted token");
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return NextResponse.redirect(new URL(CLEAR_LOCAL_STORAGE_PATH, request.url));
}
