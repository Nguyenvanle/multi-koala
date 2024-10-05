import {
  CLEAR_LOCAL_STORAGE_PATH,
  TOKEN_COOKIE_NAME,
} from "@/features/auth/enum/auth";
import { introspectServices } from "@/features/auth/services/introspect";
import { refreshServices } from "@/features/auth/services/refresh";
import { NextRequest, NextResponse } from "next/server";

interface CacheEntry {
  valid: boolean;
  timestamp: number;
}

const tokenCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 45 * 60 * 1000; // 45 minutes in milliseconds

export async function validateToken(token: string): Promise<boolean> {
  const cachedEntry = tokenCache.get(token);
  const currentTime = Date.now();

  if (cachedEntry && currentTime - cachedEntry.timestamp < CACHE_DURATION) {
    console.log("Using cached validation result:", {
      createAt: new Date().toLocaleTimeString(),
      result: cachedEntry.valid,
    });
    return cachedEntry.valid;
  }

  const { result, error } = await introspectServices.checkValid({ token });
  const isValid = result?.result.valid ?? false;

  console.log("Validate:", {
    createAt: new Date().toLocaleTimeString(),
    result: isValid,
  });

  tokenCache.set(token, { valid: isValid, timestamp: currentTime });
  return isValid;
}

export async function refreshToken(token: string): Promise<string | null> {
  console.log("Refresh: ", {
    createAt: new Date().toLocaleTimeString(),
    token,
  });
  const res = await refreshServices.refresh({ token });
  if (res.result?.result.token) {
    const newToken = res.result.result.token;
    // Invalidate the old token in cache and add the new one
    tokenCache.delete(token);
    tokenCache.set(newToken, { valid: true, timestamp: Date.now() });
    return newToken;
  } else {
    console.log("Refresh failed: ", {
      createAt: new Date().toLocaleTimeString(),
      res,
    });
    return null;
  }
}

export function handleInvalidToken(request: NextRequest): NextResponse {
  console.log("Deleted token", {
    createAt: new Date().toLocaleTimeString(),
  });

  const response = NextResponse.redirect(
    new URL(CLEAR_LOCAL_STORAGE_PATH, request.url)
  );
  response.cookies.delete(TOKEN_COOKIE_NAME);
  return response;
}