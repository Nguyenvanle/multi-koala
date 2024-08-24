"use client";
import { useRoles } from "@/hooks/useRoles";
import { useState } from "react";
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

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasRole } = useRoles();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://cdn-icons-png.flaticon.com/512/2565/2565128.png" />
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
          {hasRole("teacher") && (
            <SheetClose asChild>
              <Link href="/" className="flex items-center space-x-2">
                <User size={20} />
                <span>Dashboard</span>
              </Link>
            </SheetClose>
          )}
          {hasRole("admin") && (
            <SheetClose asChild>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <User size={20} />
                <span>Dashboard</span>
              </Link>
            </SheetClose>
          )}
          <SheetClose asChild>
            <Link href="/logout" className="flex items-center space-x-2">
              <User size={20} />
              <span>Logout</span>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;
