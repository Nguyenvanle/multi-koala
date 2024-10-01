"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/contexts/auth-context";
import { sidebarItems } from "@/types/layout/side-bar";
import {
  Menu,
  Home,
  Book,
  Users,
  DollarSign,
  Bell,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface MobileNavProps {
  menuItems: MenuItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({
  menuItems: initialMenuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const hasTeacherOrAdminRole = user?.roles.some(
    (role) => role.roleName === "TEACHER" || role.roleName === "ADMIN"
  );

  const getIcon = (label: string): React.ElementType => {
    switch (label.toLowerCase()) {
      case "home":
        return Home;
      case "courses":
        return Book;
      case "students":
        return Users;
      case "finance":
        return DollarSign;
      case "notifications":
        return Bell;
      default:
        return ChevronRight;
    }
  };

  const allMenuItems: MenuItem[] = [
    ...initialMenuItems.map((item) => ({ ...item, icon: getIcon(item.label) })),
    ...(hasTeacherOrAdminRole
      ? []
      : sidebarItems.map((item) => ({
          href: `/dashboard/${item.label.toLowerCase()}`,
          label: item.label,
          icon: getIcon(item.label),
        }))),
  ];

  const renderMenuItems = (items: MenuItem[], isDashboardMenu = false) => (
    <>
      {isDashboardMenu ? (
        <SheetTitle className="text-left text-sm font-medium text-muted-foreground mt-4 mb-2">
          Dashboard menu
        </SheetTitle>
      ) : (
        <SheetTitle className="text-left text-sm font-medium text-muted-foreground mt-4 ">
          Navigation menu
        </SheetTitle>
      )}
      {items.map((item) => (
        <SheetClose asChild key={item.label}>
          <Link
            href={item.href}
            className={`flex items-center space-x-2  py-2 rounded-md transition-colors ${
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "hover:bg-primary/5"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </SheetClose>
      ))}
    </>
  );

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-left text-primary text-2xl font-bold">
              Duokoala
            </SheetTitle>
            <SheetDescription className="hidden">
              Mobile Navigation Menu
            </SheetDescription>
          </SheetHeader>

          <nav className=" flex flex-col space-y-1">
            {renderMenuItems(
              allMenuItems.filter((item) => !item.href.startsWith("/dashboard"))
            )}
            {renderMenuItems(
              allMenuItems.filter((item) => item.href.startsWith("/dashboard")),
              true
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;