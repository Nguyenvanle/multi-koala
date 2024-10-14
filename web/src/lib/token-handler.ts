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
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function validateToken(token: string): Promise<boolean> {
  const cachedEntry = tokenCache.get(token);
  const currentTime = Date.now();

  if (cachedEntry && currentTime - cachedEntry.timestamp < CACHE_DURATION) {
    console.log("Using cached validation result:", {
      token,
      valid: cachedEntry.valid,
      cachedAt: new Date(cachedEntry.timestamp).toLocaleTimeString(),
      currentTime: new Date(currentTime).toLocaleTimeString(),
      remainingCacheTime: CACHE_DURATION - (currentTime - cachedEntry.timestamp),
    });
    return cachedEntry.valid;
  }
  

  console.log("Validating token from server:", {
    token,
    requestAt: new Date().toLocaleTimeString(),
  });
  
  const { result, error } = await introspectServices.checkValid({ token });
  
  if (error) {
    console.error("Error validating token from server:", {
      token,
      error,
      requestAt: new Date().toLocaleTimeString(),
    });
  }
  
  const isValid = result?.result.valid ?? false;
  
  console.log("Validation result from server:", {
    token,
    isValid,
    responseAt: new Date().toLocaleTimeString(),
  });
  

  console.log("Validate:", {
    createAt: new Date().toLocaleTimeString(),
    result: isValid,
  });

  if (!isValid) {
    // Nếu token không hợp lệ, xóa nó khỏi cache
    tokenCache.delete(token);
    console.log("Invalid token, cleared from cache.");
  }

  tokenCache.set(token, { valid: isValid, timestamp: currentTime });
  return isValid;
}


export async function refreshToken(token: string): Promise<string | null> {
  console.log("Attempting to refresh token:", {
    token,
    requestAt: new Date().toLocaleTimeString(),
  });
  
  const res = await refreshServices.refresh({ token });
  
  if (res.result?.result.token) {
    const newToken = res.result.result.token;
    
    console.log("Token refreshed successfully:", {
      oldToken: token,
      newToken,
      refreshedAt: new Date().toLocaleTimeString(),
    });
  
    // Thay đổi cache
    tokenCache.delete(token);
    tokenCache.set(newToken, { valid: true, timestamp: Date.now() });
    return newToken;
  } else {
    console.error("Failed to refresh token:", {
      token,
      error: res.error,
      responseAt: new Date().toLocaleTimeString(),
    });
    return null;
  }
  
}

export function handleInvalidToken(request: NextRequest, token: string): NextResponse {
  console.log("Handling invalid token:", {
    token,
    redirectPath: CLEAR_LOCAL_STORAGE_PATH,
    timestamp: new Date().toLocaleTimeString(),
  });
  
  const response = NextResponse.redirect(
    new URL(CLEAR_LOCAL_STORAGE_PATH, request.url)
  );
  tokenCache.delete(token)
  console.log("Token removed from cache.");

  response.cookies.delete(TOKEN_COOKIE_NAME);
  console.log("Token cookie deleted and user redirected.");
  return response;
  
}
