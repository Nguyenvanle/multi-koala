"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logout() {
  const { push } = useRouter();
  const { logout } = useAuth();
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (!isLogout) logout();
    setIsLogout(true);

    push("/login?from=logout");
  }, [isLogout, logout, push]);

  return (
    <div className="flex container px-auto py-6">
      <Skeleton className=" w-[100vw] h-[90vh]"></Skeleton>
    </div>
  );
}
