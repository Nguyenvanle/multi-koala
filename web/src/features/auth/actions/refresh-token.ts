"use server";

import { setAccessTokenCookie } from "@/features/auth/actions/access-token";
import { refreshServices } from "@/features/auth/services/refresh";
import { cookies } from "next/headers";

export async function refreshTokenAction() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    throw new Error("No access token available");
  }

  // Gửi access token cũ lên server để lấy token mới
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
