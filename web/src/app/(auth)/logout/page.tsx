"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

let isLogout = false;

export default function Logout() {
  const { push } = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    if (!isLogout) logout();
    isLogout = true;

    push("/login?from=logout");
  }, [logout, push]);

  return (
    <div className="flex container px-auto py-6">
      <Skeleton className=" w-[100vw] h-[90vh]"></Skeleton>
    </div>
  );
}
