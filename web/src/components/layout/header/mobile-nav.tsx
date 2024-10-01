"use client";
import React, { useState } from "react";
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
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Home,
  Book,
  Users,
  DollarSign,
  Bell,
  ChevronRight,
} from "lucide-react";

// Icons map for better scalability
const ICONS_MAP: { [key: string]: React.ElementType } = {
  home: Home,
  courses: Book,
  students: Users,
  finance: DollarSign,
  notifications: Bell,
  default: ChevronRight,
};

interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface MobileNavProps {
  menuItems: MenuItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  // Check if the user has the role of TEACHER or ADMIN
  const hasTeacherOrAdminRole = user?.roles.some(
    (role) => role.roleName === "TEACHER" || role.roleName === "ADMIN"
  );

  // Prepare the menu items
  const allMenuItems = menuItems.map((item) => ({
    ...item,
    icon: ICONS_MAP[item.label.toLowerCase()] || ICONS_MAP.default,
  }));

  // Render the menu items
  const renderMenuItems = (items: MenuItem[], title: string) => (
    <>
      <SheetTitle className="text-left text-sm font-medium text-muted-foreground mt-4 mb-2">
        {title}
      </SheetTitle>
      {items.map((item) => (
        <SheetClose asChild key={item.label}>
          <Link
            href={item.href}
            className={`flex items-center space-x-2 py-2 rounded-md transition-colors ${
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-[1.2rem] w-[1.2rem]" />
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

          <nav className="flex flex-col space-y-1">
            {/* Render regular navigation menu */}
            {renderMenuItems(
              allMenuItems.filter(
                (item) => !item.href.startsWith("/dashboard")
              ),
              "Navigation Menu"
            )}

            {/* Only render dashboard menu if user is not TEACHER or ADMIN */}
            {hasTeacherOrAdminRole &&
              renderMenuItems(
                sidebarItems.map((item) => ({
                  href: `/dashboard/${item.label.toLowerCase()}`,
                  label: item.label,
                  icon:
                    ICONS_MAP[item.label.toLowerCase()] || ICONS_MAP.default,
                })),
                "Dashboard Menu"
              )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
