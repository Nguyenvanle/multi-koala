"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { useRoles } from "@/hooks/useRoles";

export default function UserRoles() {
  const { user, loading } = useAuth();
  const { roles } = useRoles();

  return (
    <div>
      {loading ? (
        <Skeleton className="w-full h-16" />
      ) : (
        <div>
          <CardTitle>
            {user?.firstname} {user?.lastname}
          </CardTitle>
          <div className="flex flex-row gap-1">
            {roles.map((role: string) => (
              <Badge key={role} className="text-sm">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
