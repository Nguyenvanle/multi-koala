"use server";

import { cookies } from "next/headers";

export async function setAccessTokenCookie(token: string) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15, // token có thời gian sống 15 phút (hoặc tùy theo server)
    // maxAge: 60 * 45, // khi hệ thống ổn định, chỉnh lại thành 45p để giảm số lần refresh
  });
}

export async function clearAccessTokenCookie() {
  cookies().delete("token");
}
