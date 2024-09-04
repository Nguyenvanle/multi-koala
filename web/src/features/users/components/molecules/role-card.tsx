"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useRoles } from "@/hooks/useRoles";

export default function UserRoles() {
  const { user } = useAuth();
  const { roles } = useRoles();

  return (
    <>
      {!user ? (
        <Skeleton className="w-full h-16" />
      ) : (
        <>
          <CardTitle>
            {user?.firstName} {user?.lastName}
          </CardTitle>
          <div className="flex flex-row gap-1">
            {roles.map((role: string) => (
              <Badge key={role} className="text-sm">
                {role}
              </Badge>
            ))}
          </div>
        </>
      )}
    </>
  );
}
