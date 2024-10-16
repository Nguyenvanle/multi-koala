"use server";

import { setAccessTokenCookie } from "@/features/auth/actions/access-token";
import { refreshServices } from "@/features/auth/services/refresh";
import { cookies } from "next/headers";

export async function refreshTokenAction() {
  console.log("Refreshing...");
  const getCookies = cookies();

  if (!getCookies) {
    throw new Error("No request cookies token available");
  }

  const accessToken = getCookies.get("token")?.value;

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const { result } = await refreshServices.refresh({ token: accessToken });

  if (!result?.result.token) {
    throw new Error(
      "No access token in refresh response: " + JSON.stringify(result)
    );
  }

  const newAccessToken = result.result.token;

  // Cập nhật access token mới vào cookie
  setAccessTokenCookie(newAccessToken);

  return newAccessToken;
}
