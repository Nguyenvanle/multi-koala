"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { CalendarFold, Mail, MapPinHouse } from "lucide-react";
import UserAvatar from "@/features/users/components/molecules/avatar-card";
import UserRoles from "@/features/users/components/molecules/role-card";
import UserInfo from "@/features/users/components/molecules/info-card";

export default function BasicCard() {
  const { user } = useAuth();

  return (
    <Card className="flex flex-1 flex-col gap-2 sm:flex-0">
      <CardHeader className="items-center">
        <UserAvatar imageUrl={user?.imageUrl} firstName={user?.firstName}  />
      </CardHeader>

      <CardContent className="flex gap-2 flex-col pb-0 items-center">
        <UserRoles />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 items-stretch">
        <UserInfo
          icon={<Mail size={24} className="text-foreground" />}
          text={user?.email}
        />

        <UserInfo
          icon={<CalendarFold size={24} className="text-foreground" />}
          text={user?.userBirth.toLocaleDateString()}
        />

        <UserInfo
          icon={<MapPinHouse size={24} className="text-foreground" />}
          text={user?.homeTown}
        />
      </CardFooter>
    </Card>
  );
}