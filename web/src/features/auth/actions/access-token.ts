"use server";

import { cookies } from "next/headers";

export async function setAccessTokenCookie(token: string) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 5,
  });
}

export async function clearAccessTokenCookie() {
  cookies().delete("token");
}
