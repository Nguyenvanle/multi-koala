"use server";

import { introspectServices } from "@/features/auth/services/introspect";
import { cookies } from "next/headers";

export async function checkTokenValidity() {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    console.log("No token in cookies")
    return { valid: false };
  }

  // Gọi API introspect để kiểm tra tính hợp lệ
  const res = await introspectServices.checkValid({ token: accessToken });

  if (!res.result?.result) {
    throw new Error("No result in introspect response: " + JSON.stringify(res));
  }

  const isValid = res.result.result.valid;

  return { valid: isValid };
}
