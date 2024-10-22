"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";

export default function UserInfo({ icon, text }: UserInfoProps) {
  const { user, loading } = useAuth();

  return (
    <div>
      {loading ? (
        <Skeleton className="w-ful h-10" />
      ) : (
        <div className="flex flex-row gap-2">
          <div className="bg-secondary p-2 rounded">{icon}</div>
          <p className="self-center font-medium line-clamp-1">{text}</p>
        </div>
      )}
    </div>
  );
}
