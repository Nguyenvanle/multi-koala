"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { Muted } from "@/components/ui/typography";

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const MENU_ITEMS = [
    { icon: <User size={20} />, label: "Your Profile", href: "/" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
    {
      icon: <LogOut size={20} />,
      label: "Logout",
      onclick: logout,
      destructive: true,
    },
  ];

  const formatRoleName = (roleName: string) => {
    return roleName.charAt(0).toUpperCase() + roleName.slice(1).toLowerCase();
  };

  return (
    user && (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="hidden md:flex flex-col">
          <p className="font-medium">{`${user?.firstname} ${user?.lastname}`}</p>
          <Muted>{`${formatRoleName(user?.roles[0]?.roleName || "")}`}</Muted>
        </div>
        <SheetTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.image.imageUrl || "/images/smile.png"} />
          </Avatar>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="text-left text-primary hidden">
              Duokoala
            </SheetTitle>
            <SheetDescription className="text-left hidden">
              User menu
            </SheetDescription>
          </SheetHeader>

          {/* Basic User Information */}
          <div className="border-b py-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={user?.image.imageUrl || "/images/smile.png"}
                />
                <AvatarFallback>{user?.firstname.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium">{`${user?.firstname} ${user?.lastname}`}</span>
                <Muted className="line-clamp-1 " title={user?.email}>
                  {user?.email}
                </Muted>
                <Muted>{`${formatRoleName(
                  user?.roles[0]?.roleName || ""
                )}`}</Muted>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-4 mt-4">
            {MENU_ITEMS.map((item) => (
              <SheetClose key={item.label} asChild>
                <Link
                  href={item.href || ""}
                  className={`flex items-center space-x-2 ${
                    item.destructive ? "text-destructive" : ""
                  }`}
                  onClick={item.onclick}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    )
  );
};

export default UserMenu;
