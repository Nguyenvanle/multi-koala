"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthButtons() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Skeleton className="w-10 h-10 rounded-full" />;

  return (
    !isAuthenticated && (
      <div className="flex flex-row space-x-2">
        <Link href={"/login"}>
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  );
}
