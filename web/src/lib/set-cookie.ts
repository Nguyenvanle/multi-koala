import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/features/auth/enum/auth";

export function setCookie(token: string, expiration: number) {
  const cookieStore = cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: expiration,
    path: "/",
  });
}
