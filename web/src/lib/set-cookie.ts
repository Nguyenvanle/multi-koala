import { NextResponse } from "next/server";

export function setCookie(
  response: NextResponse,
  token: string,
  expiration: number
) {
  const expirationDate = new Date(Date.now() + expiration);
  const expires = expirationDate.toUTCString();

  const cookieString = `token=${token}; Path=/; HttpOnly; Expires=${expires}; SameSite=Lax; Secure`;

  // Thêm Set-Cookie header vào response
  response.headers.set("Set-Cookie", cookieString);
}
