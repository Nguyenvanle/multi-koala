"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logout() {
  const { push } = useRouter();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      if (isLoading) {
        try {
          await logout();
          push("/login?auth_processed");
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    performLogout();
  }, [isLoading, logout, push]);

  if (isLoading) {
    return (
      <div className="flex container px-auto py-6">
        <Skeleton className="w-[100vw] h-[90vh]"></Skeleton>
      </div>
    );
  }

  return null;
}