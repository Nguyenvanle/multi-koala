"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

export default function UserInfo({ icon, text }: UserInfoProps) {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <Skeleton className="w-ful h-10" />
      ) : (
        <div className="flex flex-row gap-2">
          <div className="bg-secondary p-2 rounded">{icon}</div>
          <p className="self-center font-medium line-clamp-1">{text}</p>
        </div>
      )}
    </>
  );
}
