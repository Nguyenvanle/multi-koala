"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/contexts/auth-context";

export default function AuthButtons() {
  const { isAuthenticated, loading } = useAuth();

  return (
    !isAuthenticated && (
      <div className="flex flex-row space-x-2">
        <Link href={"/login"}>
          <Button>Log in</Button>
        </Link>
      </div>
    )
  );
}
