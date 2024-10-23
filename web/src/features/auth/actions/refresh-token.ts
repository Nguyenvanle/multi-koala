"use server";

import { setAccessTokenCookie } from "@/features/auth/actions/access-token";
import { refreshServices } from "@/features/auth/services/refresh";
import { cookies } from "next/headers";
import { verify, JwtPayload } from "jsonwebtoken";

export const isTokenExpiringSoon = (
  token: string,
  bufferTimeInSeconds: number = 300
) => {
  try {
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!secretKey) {
      throw new Error("Action: JWT secret key is not defined.");
    }

    const decodedToken = verify(token, secretKey);
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (seconds)
    if (typeof decodedToken === "object" && "exp" in decodedToken) {
      if (
        decodedToken.exp &&
        decodedToken.exp - currentTime < bufferTimeInSeconds
      ) {
        console.log("Action: Token exp soon,", new Date().toLocaleTimeString());
        return true; // Token sắp hết hạn
      }
    }
    console.log("Action: Token exp ok", new Date().toLocaleTimeString());
    return false; // Token còn hạn dài
  } catch (error) {
    console.error("Action: Error decoding token:", error);
    return true; // Nếu decode lỗi, coi như token không hợp lệ
  }
};

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

  // Kiểm tra xem token có sắp hết hạn không
  if (isTokenExpiringSoon(accessToken)) {
    console.log("Action: Access token is expiring soon, refreshing...");
    const { result } = await refreshServices.refresh({ token: accessToken });

    if (!result?.result.token) {
      throw new Error(
        "No access token in refresh response: " + JSON.stringify(result)
      );
    }

    const newAccessToken = result.result.token;

    setAccessTokenCookie(newAccessToken);

    return newAccessToken;
  } else {
    console.log("Action: Access token is still valid, no need to refresh.");
    return accessToken; // Trả về access token hiện tại nếu chưa cần refresh
  }
}
