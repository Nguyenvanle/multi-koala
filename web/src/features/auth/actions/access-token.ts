"use server";

import { cookies } from "next/headers";

export function setAccessTokenCookie(token: string) {
  cookies().set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, // token có thời gian sống 15 phút (hoặc tùy theo server)
    // maxAge: 60 * 45, // khi hệ thống ổn định, chỉnh lại thành 45p để giảm số lần refresh
  });
}

export function clearAccessTokenCookie() {
  cookies().delete("accessToken");
}
