"use server";

import { clearAccessTokenCookie } from "@/features/auth/actions/access-token";

export async function logoutAction() {
  // Clear cookie chứa access token
  clearAccessTokenCookie();

  //   await logoutService.nextLogout();

  // Chuyển hướng người dùng đến trang login
  return { redirectTo: "/login" };
}
