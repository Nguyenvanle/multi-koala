"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRoles } from "@/hooks/useRoles";

export default function AuthButtons() {
  const { hasRole } = useRoles();

  return (
    hasRole("guest") && (
      <div className="flex flex-row space-x-2">
        <Link href={"/login"}>
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  );
}
