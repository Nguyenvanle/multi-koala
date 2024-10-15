"use server";

import { clearAccessTokenCookie } from "@/features/auth/actions/access-token";
import { logoutService } from "@/features/auth/services/logout";

export async function logoutAction() {
  // Clear cookie chứa access token
  clearAccessTokenCookie();

  //   await logoutService.nextLogout();

  // Chuyển hướng người dùng đến trang login
  return { redirectTo: "/login" };
}
