"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Logout() {
  const { push } = useRouter();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        toast({
          title: "Logout Failed",
          description: "An error occurred during logout. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    performLogout();
  }, [logout, push]);

  if (isLoading) {
    return (
      <div className="flex container px-auto py-6">
        <Skeleton className="w-[100vw] h-[90vh]"></Skeleton>
      </div>
    );
  }

  return null;
}