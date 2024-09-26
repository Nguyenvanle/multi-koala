"use client";
import { useRoles } from "@/hooks/useRoles";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/contexts/auth-context";

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const MENU_ITEMS = [
    { icon: <User size={20} />, label: "Your Profile", href: "/" },
    { icon: <User size={20} />, label: "Settings", href: "/" },
    { icon: <User size={20} />, label: "Logout", href: "/logout" },
  ];

  return (
    isAuthenticated && (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.image.imageUrl || "/images/smile.png"} />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="text-left">Duokoala</SheetTitle>
            <SheetDescription className="text-left">User menu</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-4">
            {MENU_ITEMS.map((item) => (
              <SheetClose key={item.label} asChild>
                <Link href={item.href} className="flex items-center space-x-2">
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
